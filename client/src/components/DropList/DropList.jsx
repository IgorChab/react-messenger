import React from 'react'
import styles from './dropList.module.css'
export default function DropList(props) {
  return (
    <div className={styles.container} 
        onMouseMove={() => {props.callback(true)}} 
        onMouseLeave={() => {props.callback(false)}}
        onMouseEnter={() => {props.callback(true)}}
    >

        <label htmlFor="img" className={styles.label}>Изображение</label>
        <input type="file" accept='image/*' name='img' id='img' className={styles.input}/>

        <label htmlFor="audio" className={styles.label}>Аудиозапись</label>
        <input type="file" accept='audio/*' name='audio' id='audio' className={styles.input}/>

        <label htmlFor="video" className={styles.label}>Видеозапись</label>
        <input type="file" accept='video/*' name='video' id='video' className={styles.input}/>

    </div>
  )
}
