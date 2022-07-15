import React from 'react'
import styles from './chatbox.module.css'
import CurrentUser from '../currentUser/CurrentUser'
import MsgInput from '../MsgInput/MsgInput'
import Message from '../Message/Message'
import { useContext } from 'react'
import { Context } from '../..'
import {io} from 'socket.io-client'
import { useState } from 'react'
import {observer} from 'mobx-react-lite'
function Chatbox() {

  const {store} = useContext(Context)

  return (
    <div className={styles.container}>

      {store.currentChat.username || store.currentChat.roomname? 
        <>
          <CurrentUser username={store.currentChat.username
            ? store.currentChat.username 
            : store.currentChat.roomname} 
            profilePhoto={store.currentChat.profilePhoto
            ? store.currentChat.profilePhoto
            : store.currentChat.file}/>
          <div className={styles.msgContainer}>
              <Message/>
              <Message/>
          </div>
          <MsgInput/>
        </>
        : 
        <div className={styles.preview}>
          <h1>Тут тихо... Даже слишком. 
            Куда все девались?</h1>
        </div>}
    </div>
  )
}

export default observer(Chatbox)