const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../api-error');
const messageModel = require('../models/message')


class UserService {

    async registration(email, password, username){
        const candidate = await userModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с таким email уже существует')
        }

        const hashPass = await bcrypt.hashSync(password, 5)
        const activationLink = uuidv4();
        const user = await userModel.create({
            username: username,
            email: email,
            password: hashPass,
            activationLink: activationLink,
            profilePhoto: '',
        });

        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activationLink){
        const user = await userModel.findOne({activationLink})
        if(!user){
            throw ApiError.BadRequest('Некорректная ссылка активации')
        }
        user.isActivated = true;
        await user.save();
    }


    async login(email, password){
        const user = await userModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с такой почтой не найден`);
        } 

        const validPass = await bcrypt.compareSync(password, user.password);
        if (!validPass){
            throw ApiError.BadRequest(`Пользователь с таким паролем не найден`);
        }
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
            activationLink: user.activationLink
        }
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthtorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb){
            throw ApiError.UnauthtorizedError()
        }
        const user = await userModel.findById(userData.id)
        const userDto = new UserDto(user);
        const tokens = await tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        
        return {
            ...tokens,
            user: userDto
        }
    }

    async findUser(findString, userId){
        const user = await userModel.findOne({$or: [{username: findString}, {email: findString}]})
        if(!user){
            if (findString.match(/^[0-9a-fA-F]{24}$/)) {
                var user2 = await userModel.findById(findString)
                var userDto2 = new UserDto(user2);
                return userDto2;
            }
        }
        if(!user && !user2){
            throw ApiError.BadRequest('User not found');
        }
        if(user.id === userId){
            throw ApiError.BadRequest("You can't add yourself");
        }
        const userDto = new UserDto(user);
        return userDto;
    }

    async addProfilePhoto(photo, id){
        const user = await userModel.findById(id);
        user.profilePhoto = photo;
        user.save();
        return user.profilePhoto;
    }

    async createContact(userId, friendId){
        const user = await userModel.findById(userId)
        const existContact = user.contacts.includes(friendId)
        if(existContact){
            throw ApiError.BadRequest('Пользователь уже добавлен');
        }
        user.contacts.push(friendId)
        user.save()
        const contact = await userModel.findById(friendId).select('id username profilePhoto')
        return contact;
    }

    async getContacts(userId){
        const user = await userModel.findById(userId)
        const contacts = await Promise.all(
            user.contacts.map(async (id) => {
                const msg = await messageModel.findOne({$or: [{reciver: id, sender: userId}, {reciver: userId, sender: id}]}).select('text media sender').sort({_id: -1})
                const user = await userModel.findById(id).select('id username profilePhoto')
                const contact = {
                    userId: user.id,
                    username: user.username,
                    profilePhoto: user.profilePhoto,
                    msg: msg?.text && msg?.sender == userId? `You: ${msg?.text}` 
                        : msg?.text? msg?.text 
                        : msg?.media.img? `${msg?.sender == userId? 'You: Pictures' : 'Pictures'}` : '' 
                        || msg?.media.video? `${msg?.sender == userId? 'You: Video📹' : 'Video📹'}` : '' 
                        || msg?.media.audio? `${msg?.sender == userId? 'You: Audio🎧' : 'Audio🎧'}`: '' 
                        || 'No messages'
                }
                return contact
            })
        )
        return contacts;
    }

    async createRoom(roomname, file, userId){
        const user = await userModel.findById(userId)
        user.rooms.push({
            key: uuidv4(),
            roomname: roomname,
            file: file? file : ''
        })
        user.save()
        const room = user.rooms.at(user.rooms.length - 1)
        return room;
    }

    async getRooms(userId){
        const user = await userModel.findById(userId)
        return user.rooms;
    }

    async saveMsg(reciver, sender, text, media, type){
        Date.prototype.timeNow = function () {
            return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes()
        }
        const date = new Date();
        const msg = await messageModel.create({
            reciver: reciver,
            sender: sender,
            text: text,
            type: type,
            time: date.timeNow(),
            media: {
                img: media?.img,
                video: media?.video,
                audio: media?.audio
            }
        })
        return msg;
    }

    async getMsg(reciverId, senderId){
        const msgs = await messageModel.find({$or: [{sender: senderId, reciver: reciverId}, {sender: reciverId, reciver: senderId}, {reciver: reciverId}]})
        .select('reciver sender text time type media')
        return msgs;
    }

    async addUserToRoom(userId, room, sender){
        const user = await userModel.findById(userId)
        const existRoom = user?.rooms.find(el => el.key === room.key)
        if(existRoom == undefined){
            let date = new Date()
            user.rooms.push(room)
            user.notification.push({
                senderId: sender.id,
                senderUsername: sender.username,
                profilePhoto: sender.profilePhoto,
                key: uuidv4(),
                date: `${(date.getDay() < 10? '0' : '') + date.getDay()}:${(date.getMonth() < 10? '0' : '') + date.getMonth()}:${date.getFullYear()}//${((date.getHours() < 10)?"0":"") + date.getHours() +":"+ ((date.getMinutes() < 10)?"0":"") + date.getMinutes()}`,
                text: `Invited you to room "${room.roomname}"`
            })
            user.save()
            return user.notification;
        } else {
            throw ApiError.BadRequest('User already invited')
        } 
    }

    async leaveRoom(userId, room){
        const user = await userModel.findById(userId)
        const i = user.rooms.findIndex(el => el.key === room.key)
        const removedRoom = user.rooms.splice(i, 1)
        user.save()
        return removedRoom[0]
    }

    async saveSettings(userId, username){
        const user = await userModel.findById(userId)
        user.username = username;
        user.save()
        return user.username
    }

    async getNotifications(userId){
        const user = await userModel.findById(userId)
        return user.notification
    }

}

module.exports = new UserService()