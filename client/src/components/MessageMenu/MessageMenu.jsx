import React from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './messageMenu.module.css'
export default function MessageMenu() {
  return (
    <div>
        <div className={styles.container}>
            <p className={styles.title}>People</p>
            <ConversationCard/>
            <ConversationCard/>
            <ConversationCard/>
        </div>
    </div>
  )
}
