import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react'
import styles from './msgInput.module.css'
import screpka from '../../img/screpka.svg'
import voiceMsg from '../../img/voiceMsg.svg'
import sendIcon from '../../img/sendIcon.svg'
import emojiIcon from '../../img/emojiIcon.svg'
import Picker from 'emoji-picker-react';
import DropList from '../DropList/DropList'
import useHover from '../../hooks/useHover'
import UserService from '../../services/userSevice'
import { useContext } from 'react'
import { Context } from '../..'
import { v4 as uuidv4 } from 'uuid';
import closeIcon from '../../img/close.svg'
export default function MsgInput({newMsg}) {

  const {store} = useContext(Context)

  const [value, setValue] = useState('')

  const [openEmojiPicler, setOpenEmojiPicler] = useState(false);

  const [img, setImg] = useState([])

  const [video, setVideo] = useState([])

  const [audio, setAudio] = useState([])

  // console.log(img)

  // const closeImg = (file) => {
  //   setImg(img.filter(obj => obj !== file))
  // }

  // const closeVideo = (file) => {
  //   setVideo(video.filter(obj => obj !== file))
  // }

  // const closeAudio = (file) => {
  //   setAudio(audio.filter(obj => obj !== file))
  // }

  const onEmojiClick = (event, emojiObject) => {
    setValue(value+emojiObject.emoji)
  };

  // const hendleOpenEmogiPicker = () => {
  //   setOpenEmojiPicler(!openEmojiPicler)
  // }

  const ref = useRef();
  const isHovering = useHover(ref);

  const [inContainer, setInContainer] = useState(false)

  const hendleSubmit = async (e) => {
    e.preventDefault()
    Date.prototype.timeNow = function () {
      return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes()
    }
    const date = new Date();
    const fd = new FormData()
    if(store.currentChat.userId){
      newMsg({
        sender: store.user.id,
        text: value,
        time: date.timeNow(),
        _id: uuidv4(),
        media: {
          img: img,
          video: video,
          audio: audio,
          preview: true
        }
      })
      
      fd.append('reciver', store.currentChat.userId)
      fd.append('sender', store.user.id)
      fd.append('text', value)
      img && img.forEach(file => {
        fd.append('img', file)
      })
      video && video.forEach(file => {
        fd.append('video', file)
      })
      audio && audio.forEach(file => {
        fd.append('audio', file)
      })
    }
    if(store.currentChat.key){
      newMsg({
        sender: JSON.stringify({
          id: store.user.id,
          profilePhoto: store.user.profilePhoto,
          username: store.user.username
        }),
        text: value,
        time: date.timeNow(),
        _id: uuidv4(),
        media: {
          img: img,
          video: video,
          audio: audio,
          preview: true
        }
      })

      fd.append('reciver', store.currentChat.key)
      fd.append('sender', JSON.stringify({
        id: store.user.id,
        profilePhoto: store.user.profilePhoto,
        username: store.user.username
      }))
      fd.append('text', value)
      img && img.forEach(file => {
        fd.append('img', file)
      })
      video && video.forEach(file => {
        fd.append('video', file)
      })
      audio && audio.forEach(file => {
        fd.append('audio', file)
      })

      store.socket.emit('room message', {
        sender: JSON.stringify({
          id: store.user.id,
          profilePhoto: store.user.profilePhoto,
          username: store.user.username
        }),
        text: value,
        time: date.timeNow(),
        _id: uuidv4(),
        media: {
          img: img,
          video: video,
          audio: audio,
        }
      }, store.currentChat.key)
    }
    
    const msg = await UserService.saveMsg(fd)
    if(store.currentChat.userId){
      store.socket.emit('send message', msg, store.currentChat.userId)
    }
    // newMsg(msg)
    setValue('')
    setImg()
    setVideo()
    setAudio()
    setOpenEmojiPicler(false)
  }

  const refOutsideClick = useRef()

    function useOutsideAlerter(ref) {
        useEffect(() => {
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    setOpenEmojiPicler(false)
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    
    useOutsideAlerter(refOutsideClick)
 
  return (
    <>
      <form className={styles.container} onSubmit={(e) => value.trim().length != 0  || img.length != 0 || video.length != 0 || audio.length != 0? hendleSubmit(e) : e.preventDefault()}>
          <div className={styles.inner_container}>
              <div className={styles.wrapperScrepka} ref={ref}>
                  <img src={screpka}/>
              </div>
              <div style={{position: 'relative', width: '100%', display: 'flex'}}>
                  {isHovering || inContainer? <DropList setInContainer={setInContainer} setImg={setImg} setVideo={setVideo} setAudio={setAudio}/> : ''}
                  <input type="text" placeholder='Type your message here...' className={styles.msgInput} onChange={(e) => {setValue(e.target.value)}} value={value}/>
                <div style={{cursor: 'pointer'}} onClick={() => {setOpenEmojiPicler(true)}}>
                  <img src={emojiIcon}/>
                </div>
                {openEmojiPicler? <div ref={refOutsideClick}><Picker onEmojiClick={onEmojiClick} preload pickerStyle={{position: 'absolute', bottom: '65px', right: '-18px', width: '350px'}}/></div> : ''}
              </div>
          </div>
          <button type='submit' className={styles.voiceMsg}>
              {value.trim().length != 0 || img?.length != 0 || video.length != 0 || audio.length != 0? <img src={sendIcon}/> : <img src={voiceMsg}/>}
          </button>
      </form>
      <div className={styles.preview}>
        {img && img.map((file, index) => (
          <div style={{position: "relative"}} key={index}>
            <img src={URL.createObjectURL(file)} className={styles.imgPreview}/>
            <img src={closeIcon} style={{position: "absolute", right: 0,  top: 10, cursor: 'pointer', pointerEvents: 'all'}} onClick={() => {setImg(img.filter(obj => obj !== file))}}/>
          </div>
        ))}
        {video && video.map((file, index) => (
          <div style={{position: "relative"}} key={index}>
            <video src={URL.createObjectURL(file)} className={styles.imgPreview} controls/>
            <img src={closeIcon} style={{position: "absolute", right: 0,  top: 10, cursor: 'pointer', pointerEvents: 'all'}} onClick={() => {setVideo(video.filter(obj => obj !== file))}}/>
          </div>
        ))}
        {audio && audio.map((file, index) => (
          <div style={{display: "flex", alignItems: 'center'}} key={index}>
            <audio src={URL.createObjectURL(file)} className={styles.imgPreview} controls style={{width: '300px', height: '50px'}}/>
            <img src={closeIcon} style={{position: "absolute", right: 0,  top: 10, cursor: 'pointer', pointerEvents: 'all'}} onClick={() => {setAudio(audio.filter(obj => obj !== file))}}/>
          </div>
        ))}
      </div>
    </>
  )
}
