import React, {useEffect, useState} from 'react'
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
export default function Chat() {

  const [newComponent, setNewComponent] = useState();

  function renderNewComponent(value, type) {
    setNewComponent({
      value,
      type
    })
  }

  return (
    <div className={chatStyles.mainFrame}>
      <Sidebar renderNewComponent={renderNewComponent}/>
      <div className={chatStyles.menuInfo}>
        {newComponent?.type == 'settings'? '' : <SearchInput/>}
        {newComponent? newComponent.value: <MessageMenu/>}
      </div>
      <Chatbox/>
    </div>
  )
}
