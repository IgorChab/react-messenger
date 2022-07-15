import React from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './groupMenu.module.css'
import MyBtn from '../UI/MyBtn'
export default function MessageMenu() {
  return (
    <div>
        <div className={styles.container}>
            <div className={styles.wrap}>
              <p className={styles.title}>Groups</p>
              <MyBtn>Add+</MyBtn>
            </div>
            <ConversationCard username={'default'}/>
            <ConversationCard username={'watermelonClan'}/>
            <ConversationCard username={'sdkjncisdcs'}/>
        </div>
    </div>
  )
}
