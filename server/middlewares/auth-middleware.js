const ApiError = require('../api-error');
const tokenService = require('../services/token-service')
module.exports = (req, res, next) => {
    try{
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader){
            return next(ApiError.UnauthtorizedError())
        }
        let token = req.headers.authorization.split(' ')[1];
        if(!token){
            return next(ApiError.UnauthtorizedError())
        }

        const userData = tokenService.validateAccessToken(token);
        if(!userData){
            return next(ApiError.UnauthtorizedError())
        }

        req.user = userData;
        next()
    } catch(e) {
        next(ApiError.UnauthtorizedError())
    }
}