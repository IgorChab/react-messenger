const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model');
class TokenService{

    async generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {expiresIn: "30d"})
        return {
            accessToken,
            refreshToken
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
}

module.exports = new TokenService();