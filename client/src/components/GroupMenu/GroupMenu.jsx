import React,{useState, useEffect} from 'react'
import ConversationCard from '../ConversationCard/ConversationCard';
import styles from './groupMenu.module.css'
import MyBtn from '../UI/MyBtn'
import MyModal from '../UI/MyModal';
import UserService from '../../services/userSevice';
import { useContext } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
function GroupMenu({socket}) {

  const {store} = useContext(Context)

  const [modalActive, setModalActive] = useState(false)

  const [img, setImg] = useState()

  const [roomname, setRoomname] = useState()

  const [err, setErr] = useState('')

  const [rooms, setRooms] = useState()

  const [filteredRooms, setFilteredRooms] = useState()

  const [newMessage, setNewMessage] = useState([])

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
    socket.current?.emit('create room', room.key)
    setRooms([room, ...rooms])
    setImg()
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

  const joinRoom = (roomId) => {
    socket?.current?.emit('leave room', store.previousChatId)
    socket?.current?.emit('create room', roomId)
    store.setPreviousChatId(roomId)
  }

  socket.current?.on('counter message', msg => {
    setNewMessage([...newMessage, msg])
  })

  console.log(newMessage)

  return (
    <>
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
      <div className={styles.container}>
          {/* <div className={styles.wrap}>
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
          </div> */}
        {filteredRooms
        ? filteredRooms.map(room => (
          <div onClick={() => {currentChat(room); joinRoom(room.key)}} key={room.key}>
            <ConversationCard username={room.roomname} avatar={room.file} msgCounter={newMessage.reciver === room.key? newMessage.length : ''}/>
          </div>
        ))
        : rooms && rooms.map(room => (
          <div onClick={() => {currentChat(room); joinRoom(room.key)}} key={room.key}>
            <ConversationCard username={room.roomname} avatar={room.file} msgCounter={newMessage._id === room.key? newMessage.length : ''}/>
          </div>
        ))
        }
        {rooms? '' : 'Loading...'}
      </div>
    </>
  )
}

export default observer(GroupMenu)