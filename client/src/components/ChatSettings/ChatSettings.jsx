import React from 'react'
import styles from './chatSettings.module.css'
import useHover from '../../hooks/useHover'
import { useRef, useEffect } from 'react'
import { useState } from 'react'
import InviteUserForm from '../InviteUserForm/InviteUserForm'
import UserService from '../../services/userSevice'
import { useContext } from 'react'
import { Context } from '../..'
export default function ChatSettings() {

    const {store} = useContext(Context)

    const [openInviteForm, setOpenInviteForm] = useState(false)

    const refOutsideClick = useRef()

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    setOpenInviteForm(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    useOutsideAlerter(refOutsideClick)
    
    const leaveRoom = async () => {
        const room = await UserService.leaveRoom(store.currentChat.roomname? store.currentChat : '')
        store.setCurrentChat({})
        store.setRemovedRoom(room)
    } 


  return (
    <>
        <div className={styles.container}>
            <div className={styles.menuItem} onClick={() => leaveRoom()}>
                Leave room
            </div>
            <div className={styles.menuItem} onClick={() => setOpenInviteForm(!openInviteForm)}>
                Add user
            </div>
            <div className={styles.menuItem}>
                Room info
            </div>
        </div>
        {openInviteForm? <div ref={refOutsideClick}><InviteUserForm/></div> : ''}
    </>
  )
}
