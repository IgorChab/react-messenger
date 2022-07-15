import React, {useContext, useState} from 'react'
import {observer} from 'mobx-react-lite'
import styles from './settings.module.css'
import addPhotoIcon from '../../img/addPhotoIcon.svg'
import UserService from '../../services/userSevice'
import { Context } from '../..'
function Settings() {

    const {store} = useContext(Context)

    // const [avatar, setAvatar] = useState(null)

    const uploadHendler = async (file) => {
        let data = new FormData();
        data.append("avatar", file);
        const photo = await UserService.uploadAvatar(data);
        // setAvatar(photo);
        store.updateProfilePhoto(photo);
    }

    let styleImg = store.user.profilePhoto? {width: '150px', height: '150px', borderRadius: '50%'} : '';

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
            <div className={styles.inputWrapper}>
                <input type="text" placeholder='Change username' className={styles.input}/>
            </div>
        </div>
    )
}

export default observer(Settings)