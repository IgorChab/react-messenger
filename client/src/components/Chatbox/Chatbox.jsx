import React from 'react'
import styles from './chatbox.module.css'
import CurrentUser from '../currentUser/CurrentUser'
import MsgInput from '../MsgInput/MsgInput'
import Message from '../Message/Message'
export default function Chatbox() {
  return (
    <div className={styles.container}>
        <CurrentUser/>
        <div className={styles.msgContainer}>
            <Message/>
            <Message/>
        </div>
        <MsgInput/>
    </div>
  )
}
