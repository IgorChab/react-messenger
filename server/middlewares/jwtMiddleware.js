const jwt = require('jsonwebtoken');
module.exports = function jwtMiddleware(req, res, next){
    if(req.headers.authorization){
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if(err){
                res.status(401).json(err.message)
            }
            if(decoded){
                res.json(decoded)
            }
        });
    } else {
        res.status(401).json("unautorized")
    }
}