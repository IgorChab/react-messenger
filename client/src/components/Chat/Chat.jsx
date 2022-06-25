import React, {useEffect, useState} from 'react'
import axios from 'axios';
import chatStyles from './chat.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SearchInput from '../SearchInput/SearchInput';
import MenuItem from '../MenuItem/MenuItem';
import './nullStyle.css';
export default function Chat() {

  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   axios.get('/api').then(res => {
  //     setData(res.data.message)
  //   })
  // }, [data])

  const [newComponent, setNewComponent] = useState();

  function renderNewComponent(value) {
    setNewComponent(value)
    console.log(value);
  }

  return (
    <div className={chatStyles.mainFrame}>
      <Sidebar renderNewComponent={renderNewComponent}/>
      <div className={chatStyles.menuInfo}>
        <SearchInput/>
        {newComponent? newComponent: <MenuItem title="Messages"/>}
      </div>
    </div>
  )
}
