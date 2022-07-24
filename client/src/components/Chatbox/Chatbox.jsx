import React, { useCallback } from 'react'
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
import { useRef } from 'react'
import { useMemo } from 'react'
import welcomeGif from '../../img/welcome.gif'

function Chatbox() {

  const {store} = useContext(Context)

  const [messages, setMessages] = useState()

  const [newMsg, setNewMsg] = useState()

  useEffect(() => {
    const socket = io()
    socket.emit('add user', store.user.id)
    store.setSocket(socket)
  }, [store.user.id])

  const scrollRef = useRef()
  
  useEffect(() => {
    messages && setMessages([...messages, newMsg])
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [newMsg])

  useEffect(() => {
    store.socket?.on('send message', (msg => {
      messages && setMessages([...messages, msg])
    }))

    store.socket?.on('room message', msg => {
      console.log(msg)
      messages && setMessages([...messages, msg])
    })

    return () => {
      store.socket?.off('send message')
      store.socket?.off('room message')
    }
  }, [messages])

  useEffect(() => {
    UserService.getMsg(store.user.id, store.currentChat.userId || store.currentChat.key).then(msgs => {
      setMessages(msgs)
      // scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    })
  }, [store.currentChat?.userId, store.currentChat?.key])


  return (
    <div className={styles.container}>

      {store.currentChat.username || store.currentChat.roomname? 
        <>
          <CurrentUser username={store.currentChat.username
            ? store.currentChat.username 
            : store.currentChat.roomname} 
            profilePhoto={store.currentChat.profilePhoto
            ? store.currentChat.profilePhoto
            : store.currentChat.file}
            room={store.currentChat.username? false : true}/>
          <div className={styles.msgContainer} >
              {messages && messages.map(msg => (
                <div key={msg._id} ref={scrollRef}>
                  <Message 
                    text={msg.text} 
                    time={msg.time} 
                    own={msg.sender.includes('{') && JSON.parse(msg.sender).id === store.user.id || msg.sender === store.user.id? true : false} 
                    media={msg.media} 
                    username={msg.sender.includes('{')? JSON.parse(msg.sender).id === store.user.id? 'You' : JSON.parse(msg.sender).username : ''}/>
                </div>
              ))}
          </div>
          <MsgInput newMsg={setNewMsg}/>
        </>
        : 
        <div className={styles.preview}>
          <img src={welcomeGif}/>
          <h1>Hello {store.user.username}, add user or choose conversation to start chat</h1>
        </div>}
    </div>
  )
}

export default observer(Chatbox)