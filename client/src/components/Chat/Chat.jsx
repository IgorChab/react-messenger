import React, {useEffect, useState} from 'react'
import axios from 'axios';
import chatStyles from './chat.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SearchInput from '../SearchInput/SearchInput';
import MessageMenu from '../MessageMenu/MessageMenu';
import Chatbox from '../Chatbox/Chatbox';
import './nullStyle.css';
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { Context } from '../..';
export default function Chat() {

  const {store} = useContext(Context)

  const [data, setData] = useState(null);

  // useEffect(() => {
  //   axios.get('/api', {
  //     headers: {
  //       authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }).then(res => {
  //     setData(res.data.message)
  //   })
  // }, [data])

  const [newComponent, setNewComponent] = useState();

  function renderNewComponent(value) {
    setNewComponent(value)
    console.log(value);
  }


  const navigate = useNavigate()

    useEffect(() => {
        if(store.isAuth == false){
          navigate('/')
        }
      }, [store.isAuth])

  return (
    <div className={chatStyles.mainFrame}>
      <Sidebar renderNewComponent={renderNewComponent}/>
      <div className={chatStyles.menuInfo}>
        <SearchInput/>
        {newComponent? newComponent: <MessageMenu/>}
      </div>
      <Chatbox/>
    </div>
  )
}
