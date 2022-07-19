import React, {useState, useEffect, useRef, useMemo} from 'react'
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

  const [chosenEmoji, setChosenEmoji] = useState('');

  const [openEmojiPicler, setOpenEmojiPicler] = useState(false);

  const [img, setImg] = useState()

  const [video, setVideo] = useState()

  const [audio, setAudio] = useState()

  const closeImg = (file) => {
    setImg(img.filter(obj => obj !== file))
  }

  const closeVideo = (file) => {
    setVideo(video.filter(obj => obj !== file))
  }

  const closeAudio = (file) => {
    setAudio(audio.filter(obj => obj !== file))
  }

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
    setValue(value+chosenEmoji.emoji)
  };

  const hendleOpenEmogiPicker = () => {
    setOpenEmojiPicler(!openEmojiPicler)
  }

  const ref = useRef();
  const isHovering = useHover(ref);

  const [inConteiner, setInConteiner] = useState(isHovering)

  function stateConteiner(bool){
    setInConteiner(bool);
  }

  const hendleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData()
    fd.append('reciver', store.currentChat._id || store.currentChat.key)
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
    Date.prototype.timeNow = function () {
      return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes()
    }
    const date = new Date();
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
    UserService.saveMsg(fd)
    setValue('')
    setImg()
    setVideo()
    setAudio()
    setOpenEmojiPicler(false)
  }
 
  return (
    <>
      <form className={styles.container} onSubmit={(e) => value || img || video || audio? hendleSubmit(e) : e.preventDefault()}>
          <div className={styles.inner_container}>
              <div className={styles.wrapperScrepka} ref={ref}>
                  <img src={screpka}/>
              </div>
              <div style={{position: 'relative', width: '100%', display: 'flex'}}>
                  {isHovering || inConteiner? <DropList callback={stateConteiner} setImg={setImg} setVideo={setVideo} setAudio={setAudio}/> : ''}
                  <input type="text" placeholder='Type your message here...' className={styles.msgInput} onChange={(e) => {setValue(e.target.value)}} value={value}/>
                <div style={{cursor: 'pointer'}} onClick={() => {hendleOpenEmogiPicker()}}>
                  <img src={emojiIcon}/>
                </div>
                {openEmojiPicler? <Picker onEmojiClick={onEmojiClick} preload pickerStyle={{position: 'absolute', bottom: '65px', right: '-18px', width: '350px'}}/> : ''}
              </div>
          </div>
          <button type='submit' className={styles.voiceMsg}>
              {value || img || video || audio? <img src={sendIcon}/> : <img src={voiceMsg}/>}
          </button>
      </form>
      <div className={styles.preview}>
        {img && img.map((file, index) => (
          <div style={{position: "relative"}} key={index}>
            <img src={URL.createObjectURL(file)} className={styles.imgPreview}/>
            <img src={closeIcon} style={{position: "absolute", right: 0,  top: 10, cursor: 'pointer', pointerEvents: 'all'}} onClick={e => closeImg(file)}/>
          </div>
        ))}
        {video && video.map((file, index) => (
          <div style={{position: "relative"}} key={index}>
            <video src={URL.createObjectURL(file)} className={styles.imgPreview} controls/>
            <img src={closeIcon} style={{position: "absolute", right: 0,  top: 10, cursor: 'pointer', pointerEvents: 'all'}} onClick={e => closeVideo(file)}/>
          </div>
        ))}
        {audio && audio.map((file, index) => (
          <div style={{display: "flex", alignItems: 'center'}} key={index}>
            <audio src={URL.createObjectURL(file)} className={styles.imgPreview} controls style={{width: '300px', height: '50px'}}/>
            <img src={closeIcon} style={{position: "absolute", right: 0,  top: 10, cursor: 'pointer', pointerEvents: 'all'}} onClick={e => closeAudio(file)}/>
          </div>
        ))}
      </div>
    </>
  )
}
