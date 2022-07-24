import React, {useContext, useEffect, useState} from 'react'
import styles from './conversationCard.module.css';
import '../Chat/nullStyle.css';
import {observer} from 'mobx-react-lite';
import { Context } from '../..';
import UserService from '../../services/userSevice'
function ConversationCard({username, avatar, msg, addBtn, userId}) {

  const {store} = useContext(Context)

  const [notification, setNotification] = useState()

  if(username){
    var charAvatar = store.generateAvatar(username)
  }

  const addUser = async () => {
    const res = await UserService.addUserToRoom(userId, store.currentChat?.roomname && store.currentChat).catch(err => {
      setNotification(err.response.data.message)
    })
    if(res){
      setNotification('Invited')
      store.socket.emit('create room', store.currentChat?.key)
      // store.socket.emit('notification', userId ,`${store.user.username} invited you to room ${store.currentChat?.roomname}`)
    }
  }

  return (
    <div className={styles.container} style={{cursor: addBtn? 'default' : 'pointer'}}>
          <div className={styles.charAvatar} style={{background: avatar? 'transparent' : 'orange'}}>
            {avatar
            ? <img src={avatar} width={50} height={50} className={styles.img}/> 
            : charAvatar
            }
          </div> 
        
        <div className={styles.innerContainer}>
            <div className={styles.wrapper}>
                <p className={styles.title}>{username}</p>
                <p style={{width: '150px'}}>{msg}</p>
            </div>
            <div className={`${styles.wrapper} ${styles.wrapperFlexEnd}`}>
                {addBtn
                ?   <div className={styles.addBtn} onClick={() => addUser()}>
                      {notification? notification : 'Invite user to room'}
                    </div>

                : <p className={styles.time}>Today, 9.52pm</p>}
            </div>
        </div>
    </div>
  )
}

export default observer(ConversationCard)