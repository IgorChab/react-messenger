import React, {useState, useEffect}from 'react'
import MenuItemStyles from './MenuItem.module.css';
import ConversationCard from '../ConversationCard/ConversationCard';
export default function MessegesMenu(props) {

  return (
    <div className={MenuItemStyles.container}>
        <p className={MenuItemStyles.title}>{props.title}</p>
        <ConversationCard/>
        <ConversationCard/>
        <ConversationCard/>
        <ConversationCard/>
    </div>
  )
}
