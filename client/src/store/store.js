import {makeAutoObservable} from 'mobx'
import authService from '../services/authService'
import axios from 'axios'
import { API_URL } from '../http';
export default class Store {
    user = {

    };

    isAuth = false;

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool){
        this.isAuth = bool
    }
    
    setUser(user){
        this.user = user
    }

    async login(email, password){
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(username, email, password){
        try {
            const response = await authService.registration(username, email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(false);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout(){
        try {
            const response = await authService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
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
    
}