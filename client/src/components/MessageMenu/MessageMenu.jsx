import React, {useState, useEffect} from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './messageMenu.module.css'
import MyBtn from '../UI/MyBtn'
import MyModal from '../UI/MyModal'
import UserService from '../../services/userSevice';
import {observer} from 'mobx-react-lite'
import { useContext } from 'react';
import { Context } from '../..';
function MessageMenu() {

  const {store} = useContext(Context);

  const [modalActive, setModalActive] = useState(false)

  const [people, setPeople] = useState()

  const [findString, setFindString] = useState('')

  const [userData, setUserData] = useState()

  const [charAvatar, setCharAvatar] = useState('');

  const [error, setError] = useState('')

  async function findUser(findString){
    if(findString.trim().length == 0){
      setError('Поле не может быть пустым');
      setUserData()
      return;
    }
    const response = await UserService.findUser(findString).catch(error => {
      if(error.response){
        setError(error.response.data.message);
        setFindString('')
        setUserData()
      }
    })
    setUserData(response.data);
    setError('');
    setCharAvatar(await store.generateAvatar(response.data.username))
    setFindString('')
  }

  const userHendler = async () => {
    const response = await UserService.createContact(userData.id).catch(error => {
        if(error.response){
          setError(error.response.data.message);
          setFindString('')
          setUserData()
        }
    })
    setPeople([...people, response.data])
    setModalActive(false)
  }

  useEffect(() => {
    UserService.getContacts(store.user.id).then(people => {
      setPeople(people)
    })
  }, [])


  const currentChat = (user) => {
    store.setCurrentChat(user)
  }

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.wrap}>
              <p className={styles.title}>People</p>
              <MyBtn activeBtn={setModalActive}>Add+</MyBtn>
              {modalActive? <MyModal active={modalActive} setActive={setModalActive}>
                <p className={styles.titlePopUp}>Введите username, id или email пользователя:</p>
                <input type="text" className={styles.input} value={findString} onChange={(e) => {setFindString(e.target.value)}}/>
                <div className={styles.wrapBtn}>
                  <button className={styles.btn} onClick={() => {findUser(findString)}}>Find</button>
                </div>
                {userData != undefined && error.length == 0?
                <div className={styles.userInfo}>
                  {userData.profilePhoto.length != 0 
                  ? 
                  <div className={styles.charAvatar} style={{background: 'transparent'}}>
                    <img src={userData.profilePhoto} className={styles.avatar}/>
                  </div>
                  : 
                  <div className={styles.charAvatar}>
                    {charAvatar}
                  </div>
                  }
                  <p style={{marginBottom: '0px', fontWeight: 500, fontSize: '16px'}}>{userData?.username}</p>
                  <div className={styles.AddToContact}
                  onClick={userHendler}>
                    +
                  </div>
                </div>
                :''}
                <div style={{textAlign: 'center', color: 'red', marginTop: '10px'}}>
                  {error? error: ''}
                </div>
              </MyModal> : ''}
            </div>
            {people && people.map(user => (
              <div onClick={e => currentChat(user)} key={user._id}>
                <ConversationCard username={user.username} avatar={user.profilePhoto}/>
              </div>
            ))}
            {people? '' : 'Loading...'}
        </div>
    </div>
  )
}

export default observer(MessageMenu);