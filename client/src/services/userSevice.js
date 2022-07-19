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

    static async createContact(friendId){
        const response = await $api.get(`/createContact/${friendId}`)
        return response;
    }

    static async getContacts(userId){
        const response = await $api.get(`/getContacts/${userId}`)
        return response.data;
    }

    static async createRoom(data){
        const response = await $api.post('/createRoom', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
        return response.data;
    }

    static async getRooms(){
        const response = await $api.get('/getRooms')
        return response.data;
    }

    static async saveMsg(msg){
        const response = await $api.post('/saveMsg', msg, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        })
        return response.data;
    }

    static async getMsg(senderId, reciverId){
        const response = await $api.post('/getMsg', {senderId, reciverId})
        return response.data;
    }

}