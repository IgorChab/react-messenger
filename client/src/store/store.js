import {makeAutoObservable} from 'mobx'
import authService from '../services/authService'
import axios from 'axios'
import { API_URL } from '../http';
export default class Store {
    user = {

    };

    isAuth = false;

    currentChat = {

    }

    query = ''

    socket = {}

    removedRoom = {}

    previousChatId = ''

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool){
        this.isAuth = bool
    }
    
    setUser(user){
        this.user = user
    }

    updateProfilePhoto(photo){
        this.user.profilePhoto = photo
    }

    setCurrentChat(obj){
        this.currentChat = obj
    }

    setQuery(query){
        this.query = query
    }

    setSocket(socket){
        this.socket = socket
    }

    setRemovedRoom(room){
        this.removedRoom = room
    }

    setUsername(username){
        this.user.username = username
    }

    setPreviousChatId(id){
        this.previousChatId = id
    }

    async login(email, password){
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            setTimeout(() => {
                if(response){
                    window.location.pathname = '/chat';
                }
            }, 1500)
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }

    async registration(username, email, password){
        try {
            const response = await authService.registration(username, email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(false);
            this.setUser(response.data.user);
            if(response){
                window.location.pathname = '/login';
            }
        } catch (e) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        }
    }

    async logout(){
        try {
            const response = await authService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
            if(response){
                window.location.pathname = '/';
            }
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth(){
        try {
            const response = await axios.get(`${API_URL}/refresh/`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e);
        }
    }

    generateAvatar(username){
        if(username && !username.includes(' ')){
            var charAvatar = username[0].toUpperCase();
            return charAvatar;
        } else {
            var charAvatar = username[0].toUpperCase() + username.split(' ')[1][0].toUpperCase();
            return charAvatar;
        }
    }
    
}