import React, {useState, useEffect} from 'react'
import styles from './slider.module.css'
import stepBtn from '../../img/stepBtn.svg'
export default function Slider({openImg, allImg, setSlider}) {

    const [currentIndex, setCurrentIndex] = useState()

    useEffect(() => {
        let index = allImg.indexOf(openImg)
        setCurrentIndex(index)
    }, []) 

    const next = () => {
        setCurrentIndex(currentIndex == allImg.length - 1? 0 : currentIndex + 1)
    }

    const previous = () => {
        setCurrentIndex(currentIndex == 0? allImg.length - 1: currentIndex - 1)
    }

    return (
    <div className={styles.wrapper} onClick={() => {setSlider(false)}}>
        <div className={styles.content} onClick={e => e.stopPropagation()}>
            <div className={styles.stepBtn} onClick={previous}>
                <img src={stepBtn}/>
            </div>
            <div className={styles.container}>
                <img src={allImg[currentIndex]} className={styles.img}/>
            </div>
            <div className={styles.stepBtn} onClick={next}>
                <img src={stepBtn} style={{transform: 'rotateY(180deg)'}}/>
            </div>
        </div>
    </div>
    )
}
