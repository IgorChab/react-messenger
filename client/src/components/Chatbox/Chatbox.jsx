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
import { useEffect } from 'react'
import UserService from '../../services/userSevice'
function Chatbox() {

  const {store} = useContext(Context)

  const [messages, setMessages] = useState()

  const [newMsg, setNewMsg] = useState()

  useEffect(() => {
    messages && setMessages([...messages, newMsg])
  }, [newMsg])

  useEffect(() => {
    UserService.getMsg(store.user.id, store.currentChat._id || store.currentChat.key).then(msgs => {
      setMessages(msgs)
    })
  }, [store.currentChat?._id, store.currentChat?.key])

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
              {messages && messages.map(msg => (
                <Message text={msg.text} time={msg.time} key={msg._id} own={msg.sender === store.user.id? true : false} media={msg.media}/>
              ))}
          </div>
          <MsgInput newMsg={setNewMsg}/>
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