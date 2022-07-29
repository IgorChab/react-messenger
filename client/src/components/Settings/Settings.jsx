import React, {useContext, useState} from 'react'
import {observer} from 'mobx-react-lite'
import styles from './settings.module.css'
import addPhotoIcon from '../../img/addPhotoIcon.svg'
import UserService from '../../services/userSevice'
import { Context } from '../..'
import checkIcon from '../../img/check.svg'
function Settings() {

    const {store} = useContext(Context)

    const [username, setUsername] = useState(store.user.username)

    const uploadHendler = async (file) => {
        let data = new FormData();
        data.append("avatar", file);
        const photo = await UserService.uploadAvatar(data);
        store.updateProfilePhoto(photo);
    }

    let styleImg = store.user.profilePhoto? {width: '150px', height: '150px', borderRadius: '50%'} : '';

    const saveChanges = async () => {
        const updateSettings = await UserService.saveSettings(username)
        store.setUsername(updateSettings)
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrap}>
                <div className={styles.title}>Edit profile</div>
            </div>
            {store.user.profilePhoto
                ? 
                <div className={styles.imgWrapper}>
                    <label htmlFor="img">
                        <img src={store.user.profilePhoto? store.user.profilePhoto : ''} className={styles.img} style={styleImg}/>
                    </label>
                    <input type="file" id="img" accept='image/png, image/svg, image/jpeg, image/jpg' onChange={e => uploadHendler(e.target.files[0])} style={{display: 'none'}}/>
                </div>
                :
                <div className={styles.imgWrapper}>
                    <label htmlFor="img">
                        <img src={addPhotoIcon} className={styles.img}/>
                    </label>
                    <input type="file" id="img" accept='image/png, image/svg, image/jpeg, image/jpg' onChange={e => uploadHendler(e.target.files[0])} style={{display: 'none'}}/>
                </div>
            }
            <div className={styles.username}>{store.user.username}</div>
            <div className={styles.id}>Your Id: {store.user.id}</div>
            <div className={username.length == 0? `${styles.inputWrapper} ${styles.err}` : styles.inputWrapper}>
                <label>{username.length == 0? 'field cannot be empty' : 'Change username'}</label>
                <input type="text"className={styles.input} onChange={e => setUsername(e.target.value)} value={username}/>
            </div>
            {username != store.user.username && username.length != 0
            ?   <button title='Save changes' className={styles.saveBtn} onClick={saveChanges}>
                    <img src={checkIcon}/>
                </button>
            : ''}
        </div>
    )
}

export default observer(Settings)