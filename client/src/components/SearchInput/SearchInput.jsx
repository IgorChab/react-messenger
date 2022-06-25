import React from 'react'
import searchIcon from '../../img/search.svg';
import styles from './searchInput.module.css';
export default function SearchInput() {
  return (
    <div className={styles.searchInput}>
        <img src={searchIcon}/>
        <input type="text" placeholder='Search' className={styles.input}/>
    </div>
  )
}
