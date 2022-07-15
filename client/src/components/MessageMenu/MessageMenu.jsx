import React, {useState, useEffect} from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './messageMenu.module.css'
import MyBtn from '../UI/MyBtn'
import MyModal from '../UI/MyModal'
import UserService from '../../services/userSevice';
import {observer} from 'mobx-react-lite'
import { useContext } from 'react';
import { Context } from '../..';
function MessageMenu() {

  const {store} = useContext(Context);

  const [modalActive, setModalActive] = useState(false)

  const [people, setPeople] = useState()

  function getNewConv(conv){
  //   // const reciverId = conv.members.find(el => el.id !== store.user.id)
  //   // members.push(reciverId)
  }

  useEffect(() => {
    UserService.getConv(store.user.id).then(async conv => {
      const reciverId = conv.map(el => el.reciverId)
      const users = await UserService.getUsers(reciverId)
      setPeople(users)
    })
    
  }, [])

  return (
    <div>
        <div className={styles.container}>
            <div className={styles.wrap}>
              <p className={styles.title}>People</p>
              <MyBtn activeBtn={setModalActive}>Add+</MyBtn>
              {modalActive? <MyModal active={modalActive} setActive={setModalActive} getNewConv={getNewConv}/> : ''}
            </div>
            {people && people.map(user => (
              <ConversationCard username={user.username} avatar={user.profilePhoto} key={user._id}/>
            ))}
        </div>
    </div>
  )
}

export default observer(MessageMenu);