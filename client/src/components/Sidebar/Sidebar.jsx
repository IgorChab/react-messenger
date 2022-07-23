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
import Settings from '../Settings/Settings'
import { useContext } from 'react';
import { Context } from '../..';
import {observer} from 'mobx-react-lite'
import { useCallback } from 'react';
function Sidebar(props) {

    const {store} = useContext(Context)

    const charAvatar = store.generateAvatar(store.user.username);

    return(
        <div className={sidebarStyles.menu}>
            <div className={sidebarStyles.profilePhotoWrapper}>
                {store.user.profilePhoto
                    ? <img src={store.user.profilePhoto} className={sidebarStyles.avatar}/>
                    : <p class={sidebarStyles.charAvatar}>{charAvatar}</p>
                }
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
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<Settings/>, 'settings')}}>
                <img src={settingsIcon} width={30} height={30}/>
            </div>
            <div className={sidebarStyles.logoutBtn} onClick={() => {store.logout()}}>
                <img src={logoutIcon} width={30} height={30}/>
            </div>
        </div>
    )
}

export default observer(Sidebar)