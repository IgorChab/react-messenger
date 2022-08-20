import React, {useEffect, useState, useRef} from 'react'
import axios from 'axios';
import chatStyles from './chat.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SearchInput from '../SearchInput/SearchInput';
import MessageMenu from '../MessageMenu/MessageMenu';
import Chatbox from '../Chatbox/Chatbox';
import Settings from '../Settings/Settings'
import './nullStyle.css';
import { useContext } from 'react';
import { Context } from '../..';
import {io} from 'socket.io-client'
export default function Chat() {

  const {store} = useContext(Context)

  const [newComponent, setNewComponent] = useState();

  function renderNewComponent(value, type) {
    setNewComponent({
      value,
      type
    })
  }

  const socket = useRef()

  useEffect(() => {
    socket.current = io()
    socket.current.emit('add user', store.user?.id)
  }, [store.user?.id])

  return (
    <div className={chatStyles.mainFrame}>
      <Sidebar renderNewComponent={renderNewComponent} socket={socket}/>
      <div className={chatStyles.menuInfo}>
        {newComponent?.type == 'settings'? '' : <SearchInput/>}
        {newComponent? newComponent.value: <MessageMenu/>}
      </div>
      <Chatbox socket={socket}/>
    </div>
  )
}
