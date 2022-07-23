import React, {useState} from 'react'
import styles from './message.module.css'
import Slider from '../Slider/Slider'
export default function Message({text, time, own, media}) {

  const [slider, setSlider] = useState(false)

  const [currentImg, setCurrentImg] = useState()

  const [allImg, setAllImg] = useState()

  const openSlider = (currentImg, allImg) => {
    setSlider(true)
    setCurrentImg(currentImg)
    setAllImg(allImg)
  }

  return (
    <>
      {slider? <Slider openImg={currentImg} allImg={allImg} setSlider={setSlider} preview={media.preview}/> : ''}
      <div className={own? styles.wrapper_own : styles.wrapper}>
        {text
        ? <div className={own? styles.text_own : styles.text}>
              {text}
          </div>
        : ''}
          {!media && text
          ? <div className={styles.time} style={{paddingRight: own? '20px' : ''}}>
              {time}
            </div>
          : ''}
          {media?
            <div className={styles.media} style={{justifyContent: own? '' : 'flex-start'}}>
              {media?.img && media?.img.map((file, index) => (
                  <img src={media.preview? URL.createObjectURL(file) : file} className={styles.fileImg} key={index} onClick={() => {openSlider(file, media?.img)}}/>
              ))}
              {media?.video && media?.video.map((file, index) => (
                  <video src={media.preview? URL.createObjectURL(file) : file} className={styles.fileVideo} key={index} controls/>
              ))}
              {media?.audio && media?.audio.map((file, index) => (
                  <audio src={media.preview? URL.createObjectURL(file) : file} className={styles.fileAudio} key={index} controls/>
              ))}
            </div>
          : ''}
          {media
          ? <div className={styles.time} style={{paddingRight: own? '20px' : ''}}>
              {time}
            </div>
          : ''}
      </div>
    </>
  )
}
