import React, {useState, useEffect} from 'react'
import styles from './msgInput.module.css'
import screpka from '../../img/screpka.svg'
import voiceMsg from '../../img/voiceMsg.svg'
import sendIcon from '../../img/sendIcon.svg'
export default function MsgInput() {

  const [value, setValue] = useState()

  return (
    <div className={styles.container}>
        <div className={styles.inner_container}>
            <div className={styles.wrapperScrepka}>
                <img src={screpka}/>
            </div>
            <input type="text" placeholder='Type your message here...' className={styles.msgInput} onChange={(e) => {setValue(e.target.value)}}/>
        </div>
        <div className={styles.voiceMsg}>
            {value? <img src={sendIcon}/> : <img src={voiceMsg}/>}
        </div>
    </div>
  )
}
