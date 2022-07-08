const userService = require('../services/user-service')
const mailService = require('../services/mail-service');
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
                await mailService.sendActivationMail(email, `${process.env.API_URL}/activate/${userData.user.activationLink}`);
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


    async getUsers(req, res, next){
        try {
            const users = await userService.getAllUsers();
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }


    async findUser(req, res, next){
        try {
            const {findString} = req.body;
            const user = await userService.findUser(findString);
            return res.json(user)
        } catch (e) {
            next(e)
        }
    }


}

module.exports = new UserController();