import React from 'react'
import styles from './myBtn.module.css';
export default function MyBtn({children, activeBtn, style}) {
  return (
    <button className={styles.btn} onClick={() => {activeBtn(true)}} style={style}>
        {children}
    </button>
  )
}
