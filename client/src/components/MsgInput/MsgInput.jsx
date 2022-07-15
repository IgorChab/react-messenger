import React, {useState, useEffect, useRef} from 'react'
import styles from './msgInput.module.css'
import screpka from '../../img/screpka.svg'
import voiceMsg from '../../img/voiceMsg.svg'
import sendIcon from '../../img/sendIcon.svg'
import emojiIcon from '../../img/emojiIcon.svg'
import Picker from 'emoji-picker-react';
import DropList from '../DropList/DropList'
import useHover from '../../hooks/useHover'
export default function MsgInput() {

  const [value, setValue] = useState('')

  const [chosenEmoji, setChosenEmoji] = useState('');

  const [openEmojiPicler, setOpenEmojiPicler] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    console.log(emojiObject);
    setChosenEmoji(emojiObject);
    setValue(chosenEmoji.emoji)
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
 
  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <div className={styles.wrapperScrepka} ref={ref}>
                <img src={screpka}/>
            </div>
            {isHovering || inConteiner? <DropList callback={stateConteiner}/> : ''}
            <input type="text" placeholder='Type your message here...' className={styles.msgInput} onChange={(e) => {setValue(e.target.value)}} value={value}/>
            <div style={{cursor: 'pointer'}} onClick={() => {hendleOpenEmogiPicker()}}>
              <img src={emojiIcon}/>
            </div>
            {openEmojiPicler? <Picker onEmojiClick={onEmojiClick} preload pickerStyle={{position: 'absolute', bottom: '120px', right: '120px', width: '350px'}}/> : ''}
        </div>
        <div className={styles.voiceMsg}>
            {value? <img src={sendIcon}/> : <img src={voiceMsg}/>}
        </div>
    </div>
  )
}
