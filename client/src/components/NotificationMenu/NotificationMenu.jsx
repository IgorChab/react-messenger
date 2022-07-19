import React from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './notificationMenu.module.css'
export default function MessageMenu() {
  return (
    <div style={{height: '100%'}}>
        <div className={styles.container}>
            <p className={styles.title}>Notification</p>
        </div>
    </div>
  )
}