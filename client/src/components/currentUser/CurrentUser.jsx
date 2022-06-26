import React from 'react'
import styles from './currentUser.module.css';
import '../Chat/nullStyle.css';
import phone from '../../img/phone.svg'
import dots from '../../img/dots.svg'
import video from '../../img/video.svg'
export default function CurrentUser(props) {
  return (
    <div className={styles.container}>
        <img src="" width={50} height={50} className={styles.img}/>
        <div className={styles.innerContainer}>
            <div className={styles.wrapper}>
                <p className={styles.title}>Friends Forever</p>
                <p className={styles.online}>Online - Last seen, 2.02pm</p>
            </div>
            <div className={styles.wrapperBtns}>
                <img src={phone}/>
                <img src={video}/>
                <img src={dots}/>
            </div>
        </div>
    </div>
  )
}