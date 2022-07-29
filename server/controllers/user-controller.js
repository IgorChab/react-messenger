const userService = require('../services/user-service')
const mailService = require('../services/mail-service');
const user = require('../models/user');
class UserController {

    async registration(req, res, next){
        try {
            const {email, password, username} = req.body;
            const userData = await userService.registration(email, password, username)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 30 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next){
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            if(userData.user.isActivated == false){
                await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${userData.activationLink}`);
            }
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 30 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(`${process.env.CLIENT_URL}/chat`);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            res.json(token);
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next){
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 30 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }


    async findUser(req, res, next){
        try {
            const {findString} = req.body;
            const user = await userService.findUser(findString, req.user.id);
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }

    async uploadAvatar(req, res, next){
        try {
            const photo = await userService.addProfilePhoto(req.file.path, req.user.id)
            return res.json(photo)
        } catch (e) {
            next(e)
        }
    }


    async createContact(req, res, next){
        try {
            const friendId = req.params.friendId;
            const userId = req.user.id;
            const contact = await userService.createContact(userId, friendId);
            return res.json(contact)
        } catch (e) {
            next(e)
        }
    }

    async getContacts(req, res, next){
        try {
            const userId = req.params.userId;
            const contacts = await userService.getContacts(userId);
            return res.json(contacts)
        } catch (e) {
            next(e)
        }
    }

    async createRoom(req, res, next){
        try {
            const roomname = req.body.roomname
            const file = req.file?.path
            const userId = req.user.id
            const room = await userService.createRoom(roomname, file, userId);
            return res.json(room)
        } catch (e) {
            next(e)
        }
    }

    async getRooms(req, res, next){
        try {
            const userId = req.user.id
            const rooms = await userService.getRooms(userId);
            return res.json(rooms)
        } catch (e) {
            next(e)
        }
    }


    async saveMsg(req, res, next){
        try {
            const {reciver, sender, text, type} = req.body
            const {img, video, audio} = req.files
            
            const myImg = img? img.map(file => file.path) : ''
            const myVideo = video? video.map(file => file.path) : ''
            const myAudio = audio? audio.map(file => file.path) : ''
            
            const media = {
                img: myImg,
                video: myVideo,
                audio: myAudio
            }
            const msg = await userService.saveMsg(reciver, sender, text, media, type);
            return res.json(msg)
        } catch (e) {
            next(e)
        }
    }

    async getMsg(req, res, next){
        try {
            const {reciverId, senderId} = req.body
            const msgs = await userService.getMsg(reciverId, senderId);
            return res.json(msgs)
        } catch (e) {
            next(e)
        }
    }

    async addUserToRoom(req, res, next){
        try {
            const {userId, room} = req.body
            const notification = await userService.addUserToRoom(userId, room, req.user);
            return res.json(notification)
        } catch (e) {
            next(e)
        }
    }

    async leaveRoom(req, res, next){
        try {
            const {room} = req.body
            const userId = req.user.id
            const removedRoom = await userService.leaveRoom(userId, room);
            return res.json(removedRoom)
        } catch (e) {
            next(e)
        }
    }

    async saveSettings(req, res, next){
        try {
            const {username} = req.body
            const userId = req.user.id
            const updateUser = await userService.saveSettings(userId, username);
            return res.json(updateUser)
        } catch (e) {
            next(e)
        }
    }

    async getNotifications(req, res, next){
        try {
            const userId = req.user.id;
            const notification = await userService.getNotifications(userId);
            return res.json(notification)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new UserController();