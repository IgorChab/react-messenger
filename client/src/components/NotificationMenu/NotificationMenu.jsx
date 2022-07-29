import React, {useEffect, useState} from 'react'
import UserService from '../../services/userSevice'
import ConversationCard from '../ConversationCard/ConversationCard'
import styles from './notificationMenu.module.css'
export default function NotificationMenu({setCheckNotice}) {

  const [notification, setNotification] = useState()
  
  useEffect(() => {
    UserService.getNotifications().then(notification => {
      setNotification(notification)
    })
    setCheckNotice(true)
  }, [])

  return (
    <>
      <p className={styles.title}>Notification</p>
      <div className={styles.container}>
          {notification && notification.map(notification => (
            <ConversationCard username={notification?.senderUsername} avatar={notification?.profilePhoto} msg={notification?.text} date={notification?.date} key={notification?.key}/>
          ))}
          {!notification? 'Loading...' : ''}
      </div>
    </>
  )
}