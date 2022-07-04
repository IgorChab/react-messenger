const userService = require('../services/user-service')
class UserController {

    async registration(req, res, next){
        try {
            // await userModel.findOne({email: req.body.email}).then(candidate => {
            //     if(candidate){
            //         res.end(JSON.stringify({error: 'Пользователь стаким email уже существует'}))
            //     } else {
            //         const hashPass = bcrypt.hashSync(req.body.password, 5)
            //         const activationLink = hashPass;
            //         userModel.create({
            //             username: req.body.username,
            //             email: req.body.email,
            //             password: hashPass,
            //             activationLink: activationLink
            //         })
            //         res.end(JSON.stringify({success: true}))
            //     }
            // })

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
            await userModel.findOne({email: req.body.email}).then(user => {
                if (!user) {
                    res.end(JSON.stringify({emailError: `Пользователь с такой почтой не найден`}))
                } else {
                    const validPass = bcrypt.compareSync(req.body.password, user.password)
                    if (!validPass){
                        res.end(JSON.stringify({passwordError: `Пользователь с таким паролем не найден`}))
                    } else {
                        //jwt & redirect to chat
                        // mailService.sendActivationMail(user.email, user.activationLink)
                        // const userDto = new userDto(user);
                        // const tokens = tokenService.generateTokens(...userDto);
                        // tokenService.saveToken(userDto.id, tokens.refreshToken)
                        // res.end(JSON.stringify({
                        //     success: true,
                        // }))
                    }
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next){
        try {
            console.log('work');
            console.log(req.params);
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next){
        try {
            
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new UserController();