const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const tokenService = require('../services/token-service');
const UserDto = require('../dtos/user-dto');
const { v4: uuidv4 } = require('uuid');
const ApiError = require('../api-error');
const mongoose = require('mongoose');
const conversationModel = require('../models/conversation');

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
            profilePhoto: ''
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


    async findUser(findString){
        const user = await userModel.findOne({$or: [{username: findString}, {email: findString}]})
        if(!user){
            if (findString.match(/^[0-9a-fA-F]{24}$/)) {
                var user2 = await userModel.findById(findString)
                var userDto2 = new UserDto(user2);
                return userDto2;
            }
        }
        if(!user && !user2){
            throw ApiError.BadRequest('Пользователь не найден');
        }
        const userDto = new UserDto(user);
        return userDto;
    }


    async addUser(id){
        const user = await userModel.findById(id);
        user.people.push({

        })
    }

    async addProfilePhoto(photo, id){
        const user = await userModel.findById(id);
        user.profilePhoto = photo;
        user.save();
        return user.profilePhoto;
    }

    async createConv(senderId, reciverId){
        const existConv = await conversationModel.findOne({senderId: senderId, reciverId: reciverId})
        if(existConv){
            throw ApiError.BadRequest('Пользователь уже добавлен');
        }
        const conv = await conversationModel.create({
            senderId: senderId,
            reciverId: reciverId
        });
        return conv;
    }

    async getConv(senderId){
        const conv = await conversationModel.find({$or: [{senderId: senderId}, {reciverId: senderId}]})
        return conv;
    }

    async getUsers(reciverId){
        const users = await Promise.all(
            reciverId.map(id => {
                return userModel.findById(id).select('id username profilePhoto')
                
            })
        )
        return users
    }
}

module.exports = new UserService()