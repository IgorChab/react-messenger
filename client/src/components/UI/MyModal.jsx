import React, {useState, useContext} from 'react'
import styles from './myModal.module.css'
import { Context } from '../..';
import UserService from '../../services/userSevice';
import {observer} from 'mobx-react-lite'
function MyModal({active, setActive, children}) {

  return (
    <div className={styles.wrapper} onClick={() => {setActive(false)}}>
        <div className={styles.content} onClick={(e) => {e.stopPropagation()}}>
          {children}
        </div>
    </div>
  )
}

export default observer(MyModal)