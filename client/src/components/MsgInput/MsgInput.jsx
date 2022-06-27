import React, {useState, useEffect} from 'react'
import styles from './msgInput.module.css'
import screpka from '../../img/screpka.svg'
import voiceMsg from '../../img/voiceMsg.svg'
import sendIcon from '../../img/sendIcon.svg'
import emojiIcon from '../../img/emojiIcon.svg'
import Picker from 'emoji-picker-react';
export default function MsgInput() {

  const [value, setValue] = useState('')

  const [chosenEmoji, setChosenEmoji] = useState('');

  const [openEmojiPicler, setOpenEmojiPicler] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
    setValue(value + chosenEmoji.emoji)
  };

  const hendleOpenEmogiPicker = () => {
    setOpenEmojiPicler(!openEmojiPicler)
  }

  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <div className={styles.wrapperScrepka}>
                <img src={screpka}/>
            </div>
            <input type="text" placeholder='Type your message here...' className={styles.msgInput} onChange={(e) => {setValue(e.target.value)}} value={value}/>
            <img src={emojiIcon} style={{cursor: 'pointer'}} onClick={() => {hendleOpenEmogiPicker()}}/>
            {openEmojiPicler? <Picker onEmojiClick={onEmojiClick} pickerStyle={{position: 'absolute', bottom: '80px', right: '100px', width: '350px'}}/> : ''}
        </div>
        <div className={styles.voiceMsg}>
            {value? <img src={sendIcon}/> : <img src={voiceMsg}/>}
        </div>
    </div>
  )
}
