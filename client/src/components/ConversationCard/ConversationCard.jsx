import React from 'react'
import styles from './conversationCard.module.css';
import '../Chat/nullStyle.css';
export default function ConversationCard(props) {
  return (
    <div className={styles.container}>
        <img src="" width={50} height={50} className={styles.img}/>
        <div className={styles.innerContainer}>
            <div className={styles.wrapper}>
                <p className={styles.title}>Friends Forever</p>
                <p>Hahahahah!</p>
            </div>
            <div className={`${styles.wrapper} ${styles.wrapperFlexEnd}`}>
                <p className={styles.time}>Today, 9.52pm</p>
            </div>
        </div>
    </div>
  )
}
