import React, {useState, useContext} from 'react'
import styles from './myModal.module.css'
import { Context } from '../..';
import UserService from '../../services/userSevice';
import {observer} from 'mobx-react-lite'
function MyModal({active, setActive, getNewConv}) {

  const {store} = useContext(Context);

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
    const response = await UserService.createConv(store.user.id, userData.id).catch(error => {
        if(error.response){
          setError(error.response.data.message);
          setFindString('')
          setUserData()
        }
    })
    getNewConv(response.data);
    setActive(false)
  }

  return (
    <div className={styles.wrapper} onClick={() => {setActive(false)}}>
        <div className={styles.content} onClick={(e) => {e.stopPropagation()}}>
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
        </div>
    </div>
  )
}

export default observer(MyModal)