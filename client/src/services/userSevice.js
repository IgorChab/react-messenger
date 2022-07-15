import $api from '../http/index'
export default class UserService {
    static fetchUsers(){
        return $api.get('/users')
    }

    static async findUser(findString){
        const user = await $api.post('/findUser', {
            findString: findString
        })
        return user;
    }

    static async uploadAvatar(data){
        const response = await $api.post('/uploadAvatar', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
        return response.data;
    }

    static async createConv(senderId, reciverId){
        const response = await $api.post('/createConv', {senderId, reciverId})
        return response;
    }

    static async getConv(senderId){
        const response = await $api.post('/getConv', {senderId})
        return response.data;
    }

    static async getUsers(reciverId){
        const response = await $api.post('/getUsers', {reciverId})
        return response.data;
    }

}