import React, {useEffect} from 'react'
import styles from './currentUser.module.css';
import '../Chat/nullStyle.css';
import phone from '../../img/phone.svg'
import dots from '../../img/dots.svg'
import video from '../../img/video.svg'
import { useContext } from 'react';
import { Context } from '../..';
export default function CurrentUser({username, profilePhoto}) {

  const {store} = useContext(Context)

  if(username){
    var charAvatar = store.generateAvatar(username)
  }

  return (
    <div className={styles.container}>
        {profilePhoto?
          <div className={styles.img}>
            <img src={profilePhoto}/>
          </div>
        :
          <div className={styles.charAvatar}>
            {charAvatar}
          </div>
        }

        <div className={styles.innerContainer}>
            <div className={styles.wrapper}>
                <p className={styles.title}>{username}</p>
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