import React,{useState, useEffect} from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './groupMenu.module.css'
import MyBtn from '../UI/MyBtn'
import MyModal from '../UI/MyModal';
import UserService from '../../services/userSevice';
import { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
function GroupMenu() {

  const {store} = useContext(Context)

  const [modalActive, setModalActive] = useState(false)

  const [img, setImg] = useState()

  const [roomname, setRoomname] = useState()

  const [err, setErr] = useState('')

  const [rooms, setRooms] = useState()

  const [filteredRooms, setFilteredRooms] = useState()


  const hendleCreate = async () => {
    if(img && !img.type.includes('image')){
      setErr('Only image types')
    }
    if(!roomname){
      setErr('Room name cannot be empty')
      return
    }
    const data = new FormData();
    data.append('avatar', img)
    data.append('roomname', roomname)
    const room = await UserService.createRoom(data)
    store.socket.emit('create room', room.key)
    setRooms([...rooms, room])
    err? setModalActive(true) : setModalActive(false) && setErr('')
  }

  useEffect(() => {
    UserService.getRooms().then(rooms => {
      setRooms(rooms)
    })
  }, [])

  useEffect(() => {
    setRooms(rooms?.filter(room => room.key !== store?.removedRoom?.key))
  }, [store.removedRoom])

  const currentChat = (room) => {
    store.setCurrentChat(room)
  }

  useEffect(() => {
    const filteredGroups = rooms && rooms.filter(group => group.roomname.includes(store?.query))
    setFilteredRooms(filteredGroups)
    // if(!filteredRooms){
    //   setErr('Groups not found')
    // }
  }, [store?.query])

  return (
    <div style={{height: '100%'}}>
        <div className={styles.container}>
            <div className={styles.wrap}>
              <p className={styles.title}>Groups</p>
              <MyBtn activeBtn={setModalActive}>Add+</MyBtn>
              {modalActive? 
              <MyModal setActive={setModalActive}>
                <p className={styles.titlePopUp}>Create new room</p>
                <div className={styles.wrapModal}>
                  <div className={styles.wrapInput}>
                    <p>Room name</p>
                    <input type={'text'} onChange={e => setRoomname(e.target.value)}/>
                  </div>
                  <div>
                    <p>Room avatar</p>
                    <input type="file" accept='image/*' onChange={e => setImg(e.target.files[0])}/>
                  </div>
                </div>
                <div className={styles.btn} onClick={hendleCreate}>
                  Create
                </div>
                <p style={{color: 'red', textAlign: 'center'}}>
                  {err}
                </p>
              </MyModal>
              :
              ''}
            </div>
            {filteredRooms
            ? filteredRooms.map(room => (
              <div onClick={() => currentChat(room)} key={room.key}>
                <ConversationCard username={room.roomname} avatar={room.file}/>
              </div>
            ))
            : rooms && rooms.map(room => (
              <div onClick={() => currentChat(room)} key={room.key}>
                <ConversationCard username={room.roomname} avatar={room.file}/>
              </div>
            ))
            }
            {rooms? '' : 'Loading...'}
        </div>
    </div>
  )
}

export default observer(GroupMenu)