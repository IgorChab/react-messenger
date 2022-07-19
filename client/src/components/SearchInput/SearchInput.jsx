import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Context } from '../..';
import searchIcon from '../../img/search.svg';
import styles from './searchInput.module.css';
export default function SearchInput() {

  const [query, setQuery] = useState()

  const {store} = useContext(Context)

  useEffect(() => {
    store.setQuery(query && query.toLowerCase())
  }, [query])

  return (
    <div className={styles.searchInput}>
        <img src={searchIcon}/>
        <input type="text" placeholder='Search' className={styles.input} onChange={e => setQuery(e.target.value)}/>
    </div>
  )
}
