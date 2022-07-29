import React, {useRef, useState} from 'react'
import styles from './inviteUserForm.module.css'
import UserService from '../../services/userSevice'
import { useEffect } from 'react'
import { useContext } from 'react'
import {Context} from '../..'
import ConversationCard from '../ConversationCard/ConversationCard'
export default function InviteUserForm({socket}) {
    
    const {store} = useContext(Context)

    const [contacts, setContacts] = useState()

    useEffect(() => {
        UserService.getContacts(store.user.id).then(contacts => {
            setContacts(contacts)
        })
    }, [])

    return (
        <div className={styles.container}>
            {contacts && contacts.map(user => (
                user.userId != store.user.id? <ConversationCard username={user.username} avatar={user.profilePhoto} addBtn={true} key={user.userId} userId={user.userId} socket={socket}/> : ''
            ))}
            {!contacts? 'Loading...' : ''}
        </div>
    )
}
