import $api from "../http/index"
export default class AuthService {

    static async login(email, password){
        return $api.post('/login', {email, password})
    }

    static async registration(username, email, password){
        return $api.post('/register', {username, email, password})
    }

    static async logout(){
        return $api.get('/logout')
    }
}