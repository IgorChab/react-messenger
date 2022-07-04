import React, {useState, useEffect} from 'react';
import sidebarStyles from './sidebar.module.css';
import messageIcon from '../../img/Vector.svg';
import settingsIcon from "../../img/ci_settings.svg";
import logoutIcon from "../../img/majesticons_door-exit.svg";
import notificationIcon from "../../img/bx_bell.svg";
import groupsIcon from '../../img/groupIcon.svg';
import MessageMenu from '../MessageMenu/MessageMenu';
import GroupMenu from '../GroupMenu/GroupMenu'
import NotificationMenu from '../NotificationMenu/NotificationMenu'
import { Link } from 'react-router-dom';
export default function Sidebar(props) {

    return(
        <div className={sidebarStyles.menu}>
            <div className={sidebarStyles.profilePhotoWrapper}>
                <img src=''  width={78} height={78}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<MessageMenu/>)}}>
                <img src={messageIcon} width={30} height={30}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<GroupMenu/>)}}>
                <img src={groupsIcon} width={30} height={30}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<NotificationMenu/>)}}>
                <img src={notificationIcon} width={30} height={30}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent()}}>
                <img src={settingsIcon} width={30} height={30}/>
            </div>
            <Link to={'/logout'} className={sidebarStyles.logoutBtn}>
                <img src={logoutIcon} width={40} height={40}/>
            </Link>
        </div>
    )
}