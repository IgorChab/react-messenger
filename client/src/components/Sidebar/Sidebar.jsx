import React, {useState, useEffect} from 'react';
import sidebarStyles from './sidebar.module.css';
import messageIcon from '../../img/Vector.svg';
import settingsIcon from "../../img/ci_settings.svg";
import logoutIcon from "../../img/majesticons_door-exit.svg";
import notificationIcon from "../../img/bx_bell.svg";
import groupsIcon from '../../img/groupIcon.svg';
import MenuItem from '../MenuItem/MenuItem';
export default function Sidebar(props) {

    return(
        <div className={sidebarStyles.menu}>
            <div className={sidebarStyles.profilePhotoWrapper}>
                <img src=''  width={78} height={78}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<MenuItem title={'Messages'}/>)}}>
                <img src={messageIcon} width={40} height={40}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<MenuItem title={'Groups'}/>)}}>
                <img src={groupsIcon} width={40} height={40}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<MenuItem title={'Notification'}/>)}}>
                <img src={notificationIcon} width={40} height={40}/>
            </div>
            <div className={sidebarStyles.menuItem} onClick={() => {props.renderNewComponent(<MenuItem title={'Settings'}/>)}}>
                <img src={settingsIcon} width={40} height={40}/>
            </div>
            <div className={sidebarStyles.logoutBtn}>
                <img src={logoutIcon} width={40} height={40}/>
            </div>
        </div>
    )
}