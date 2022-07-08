const Router = require('express').Router;
const userController = require('./controllers/user-controller');
const authMiddleware = require('./middlewares/auth-middleware')
const router = new Router();

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/activate/:link', userController.activate)
router.get('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.post('/findUser', authMiddleware, userController.findUser)

module.exports = router;