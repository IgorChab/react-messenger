import $api from '../http/index'
export default class UserService {
    static fetchUsers(){
        return $api.get('/users')
    }
}