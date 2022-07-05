const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
class TokenService{

    async generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: "30s"})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await tokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await tokenModel.create({user: userId, refreshToken: refreshToken})
        return token;
    }

    async removeToken(refreshToken){
        const tokenData = tokenModel.deleteOne({refreshToken})
        return tokenData;
    }

    async findToken(refreshToken){
        const tokenData = tokenModel.findOne({refreshToken})
        return tokenData;
    }
}

module.exports = new TokenService();