import React, {useContext, useEffect, useState} from 'react'
import styles from './conversationCard.module.css';
import '../Chat/nullStyle.css';
import {observer} from 'mobx-react-lite';
import { Context } from '../..';
import UserService from '../../services/userSevice';
function ConversationCard({username, avatar}) {

  const {store} = useContext(Context)

  // const [people, setPeople] = useState()

  if(username){
    var charAvatar = store.generateAvatar(username)
  }

  // useEffect(() => {
  //   const reciverId = conversation.members.find(el => el !== store.user.id)
  //   if(reciverId){
  //     UserService.getUsers(reciverId).then(user => {
  //       setPeople(user)
  //     })
  //   }
  // }, [conversation])

  return (
    <div className={styles.container}>
          <div className={styles.charAvatar} style={{background: avatar? 'transparent' : 'orange'}}>
            {avatar
            ? <img src={avatar} width={50} height={50} className={styles.img}/> 
            : charAvatar
            }
          </div> 
        
        <div className={styles.innerContainer}>
            <div className={styles.wrapper}>
                <p className={styles.title}>{username}</p>
                <p>Hahahahah!</p>
            </div>
            <div className={`${styles.wrapper} ${styles.wrapperFlexEnd}`}>
                <p className={styles.time}>Today, 9.52pm</p>
            </div>
        </div>
    </div>
  )
}

export default observer(ConversationCard)