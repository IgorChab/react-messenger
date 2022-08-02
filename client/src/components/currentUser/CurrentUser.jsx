import React, {useEffect, useState} from 'react'
import styles from './currentUser.module.css';
import '../Chat/nullStyle.css';
import phone from '../../img/phone.svg'
import dots from '../../img/dots.svg'
import video from '../../img/video.svg'
import { useContext } from 'react';
import { Context } from '../..';
import ChatSettings from '../ChatSettings/ChatSettings'
import useHover from '../../hooks/useHover';
import { useRef } from 'react';
export default function CurrentUser({username, profilePhoto, room, socket}) {

  const {store} = useContext(Context)

  if(username){
    var charAvatar = store.generateAvatar(username)
  }

  const [openSettings, setOpenSettings] = useState(false)

  const [online, setOnline] = useState()

  const refOutsideClick = useRef()

  useEffect(() => {
    socket?.current?.on('online', online => {
      setOnline(online)
      console.log(online)
    })
  }, [])

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenSettings(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(refOutsideClick)

  return (
    <>
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
                  <p className={styles.online}>{online && !room? 'Online' : 'Offline'}</p>
              </div>
              <div className={styles.wrapperBtns}>
                  <img src={phone}/>
                  <img src={video}/>
                  <img src={dots} onClick={() => setOpenSettings(!openSettings)}/>
              </div>
          </div>
      </div>
      {openSettings && room? <div ref={refOutsideClick}><ChatSettings socket={socket}/></div> : ''}
    </>
  )
}