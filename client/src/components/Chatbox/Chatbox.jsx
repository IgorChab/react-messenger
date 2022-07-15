import React from 'react'
import styles from './chatbox.module.css'
import CurrentUser from '../currentUser/CurrentUser'
import MsgInput from '../MsgInput/MsgInput'
import Message from '../Message/Message'
import { useContext } from 'react'
import { Context } from '../..'
export default function Chatbox() {

  // const {store} = useContext(Context)

  // console.log(store)

  return (
    <div className={styles.container}>
{/*         
        <CurrentUser username={store.currentConv.username} profilePhoto={store.currentConv.profilePhoto}/>
        <div className={styles.msgContainer}>
            <Message/>
            <Message/>
        </div>
        <MsgInput/> */}
    
        <div className={styles.preview}>
          <h1>Тут тихо... Даже слишком. 
            Куда все девались?</h1>
        </div>
        
    </div>
  )
}
