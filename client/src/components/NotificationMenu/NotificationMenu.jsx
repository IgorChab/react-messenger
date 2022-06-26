import React from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './notificationMenu.module.css'
export default function MessageMenu() {
  return (
    <div>
        <div className={styles.container}>
            <p className={styles.title}>Notification</p>
        </div>
    </div>
  )
}