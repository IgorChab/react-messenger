const userService = require('../services/user-service')
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
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 24 * 30 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next){
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
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
}

module.exports = new UserController();