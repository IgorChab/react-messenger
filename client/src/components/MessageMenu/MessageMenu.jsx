import React, {useState, useEffect, useCallback} from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './messageMenu.module.css'
import MyBtn from '../UI/MyBtn'
import MyModal from '../UI/MyModal'
import UserService from '../../services/userSevice';
import {observer} from 'mobx-react-lite'
import { useContext } from 'react';
import { Context } from '../..';
function MessageMenu({socket}) {

  const {store} = useContext(Context);

  const [modalActive, setModalActive] = useState(false)

  const [people, setPeople] = useState()

  const [findString, setFindString] = useState('')

  const [userData, setUserData] = useState()

  const [charAvatar, setCharAvatar] = useState('')

  const [error, setError] = useState('')

  const [filterPeople, setFilterPeople] = useState()

  const [err, setErr] = useState()

  async function findUser(findString){
    if(findString.trim().length == 0){
      setError('Field cannot be empty');
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

  const currentChat = useCallback((user) => {
    store.setCurrentChat(user)
  }, [store.currentChat])

  useEffect(() => {
    const filteredPeople = people && people.filter(user => user.username.includes(store?.query))
    setFilterPeople(filteredPeople)
    if(!filteredPeople){
      setErr('Users not found')
    }
  }, [store?.query])

  const joinRoom = (userId) => {
    socket?.current?.emit('leave room', store.previousChatId)
    socket?.current?.emit('create room', userId)
    store.setPreviousChatId(userId)
  }

  return (
      <>
        <div className={styles.wrap}>
          <p className={styles.title}>People</p>
          <MyBtn activeBtn={setModalActive}>Add+</MyBtn>
          {modalActive? <MyModal active={modalActive} setActive={setModalActive}>
            <p className={styles.titlePopUp}>Enter the user's username, id or email:</p>
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
        <div className={styles.container}>
            {filterPeople
            ? filterPeople && filterPeople.map(user => (
              <div onClick={e => {currentChat(user); joinRoom(user.userId)}} key={user.userId}>
                <ConversationCard username={user.username} avatar={user.profilePhoto} msg={user.msg} key={user.userId} date={user.date}/>
              </div>
            )) 
            : people && people.map(user => (
              <div onClick={e => {currentChat(user); joinRoom(user.userId)}} key={user.userId}>
                <ConversationCard username={user.username} avatar={user.profilePhoto} msg={user.msg} key={user.userId} date={user.date}/>
              </div>
            ))
            }
            {people? '' : 'Loading...'}
            
        </div>
    </>
  )
}

export default observer(MessageMenu);