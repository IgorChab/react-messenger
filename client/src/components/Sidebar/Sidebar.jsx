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
import UserService from '../../services/userSevice';
function Sidebar({socket, renderNewComponent}) {

    const {store} = useContext(Context)

    const charAvatar = store.generateAvatar(store.user.username);

    const [currentMenuItem, setCurrentMenuItem] = useState('MessageMenu')

    const [checkNotice, setCheckNotice] = useState(false)

    const [newNotice, setNewNotice] = useState(false)

    socket.current?.on('notification', () => {
        setNewNotice(true)
    })

    return(
        <div className={sidebarStyles.menu}>
            <div className={sidebarStyles.profilePhotoWrapper}>
                {store.user.profilePhoto
                    ? <img src={store.user.profilePhoto} className={sidebarStyles.avatar}/>
                    : <p class={sidebarStyles.charAvatar}>{charAvatar}</p>
                }
            </div>
            <div className={currentMenuItem == 'MessageMenu'? sidebarStyles.menuItem_current : sidebarStyles.menuItem} onClick={() => {renderNewComponent(<MessageMenu socket={socket}/>); setCurrentMenuItem('MessageMenu')}}>
                <img src={messageIcon} width={30} height={30}/>
            </div>
            <div className={currentMenuItem == 'GroupMenu'? sidebarStyles.menuItem_current : sidebarStyles.menuItem} onClick={() => {renderNewComponent(<GroupMenu socket={socket}/>); setCurrentMenuItem('GroupMenu')}}>
                <img src={groupsIcon} width={30} height={30}/>
            </div>
            <div className={currentMenuItem == 'NotificationMenu'? sidebarStyles.menuItem_current : sidebarStyles.menuItem} onClick={() => {renderNewComponent(<NotificationMenu setCheckNotice={setCheckNotice}/>); setCurrentMenuItem('NotificationMenu')}}>
                <img src={notificationIcon} width={30} height={30}/>
                {newNotice && !checkNotice? <div className={sidebarStyles.notice}></div> : ''}
            </div>
            <div className={currentMenuItem == 'Settings'? sidebarStyles.menuItem_current : sidebarStyles.menuItem} onClick={() => {renderNewComponent(<Settings/>, 'settings'); setCurrentMenuItem('Settings')}}>
                <img src={settingsIcon} width={30} height={30}/>
            </div>
            <div className={sidebarStyles.logoutBtn} onClick={() => {store.logout()}}>
                <img src={logoutIcon} width={30} height={30}/>
            </div>
        </div>
    )
}

export default observer(Sidebar)