import React, {useState} from 'react'
import { useRef } from 'react'
import useHover from '../../hooks/useHover'
import styles from './dropList.module.css'
export default function DropList({setInContainer, setImg, setVideo, setAudio}) {

  const hendlerImg = (files) => {
    const fileTypes = ["image/png", "image/jpeg", 'image/jpg', 'image/gif']
    if(files.length > 5){
      return alert('It is possible to upload a maximum of 5 files')
    }
    const uploadTypes = [...files].map(file => file.type)
    const validType = fileTypes.includes(...uploadTypes)
    if(!validType){
      return alert('Only img types (png, jpeg, jpg, gif)')
    }
    setImg([...files])
  }

  const hendlerVideo = (files) => {
    const fileTypes = ['video/mp4', 'video/webm', 'video/ogg']
    if(files.length > 5){
      return alert('It is possible to upload a maximum of 5 files')
    }
    const uploadTypes = [...files].map(file => file.type)
    const validType = fileTypes.includes(...uploadTypes)
    if(!validType){
      return alert('Only video types (mp4, webm, ogg)')
    }
    setVideo([...files])
  }

  const hendlerAudio = (files) => {
    const fileTypes = ['audio/wav', 'audio/mpeg', 'audio/ogg, audio/mp3, audio/aiff']
    if(files.length > 5){
      return alert('It is possible to upload a maximum of 5 files')
    }
    const uploadTypes = [...files].map(file => file.type)
    const validType = fileTypes.includes(...uploadTypes)
    if(!validType){
      return alert('Only audio types (wav, mpeg, ogg, mp3, aiff)')
    }
    setAudio([...files])
  }

  const ref = useRef()

  setInContainer(useHover(ref))

  return (
    <div className={styles.container} ref={ref}>

        <label htmlFor="img" className={styles.label}>Изображение</label>
        <input type="file" accept='image/*' name='img' id='img' multiple className={styles.input} onChange={e => hendlerImg(e.target.files)}/>

        <label htmlFor="audio" className={styles.label}>Аудиозапись</label>
        <input type="file" accept='audio/*' name='audio' id='audio' multiple className={styles.input} onChange={e => hendlerAudio(e.target.files)}/>

        <label htmlFor="video" className={styles.label}>Видеозапись</label>
        <input type="file" accept='video/*' name='video' id='video' multiple className={styles.input} onChange={e => hendlerVideo(e.target.files)}/>

    </div>
  )
}
