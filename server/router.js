const Router = require('express').Router;
const userController = require('./controllers/user-controller');
const authMiddleware = require('./middlewares/auth-middleware');
const fileMiddleware = require('./middlewares/file-middleware');

const router = new Router();

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/activate/:link', userController.activate)
router.get('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.post('/getUsers', authMiddleware, userController.getUsers)
router.post('/findUser', authMiddleware, userController.findUser)
router.post('/uploadAvatar', authMiddleware, fileMiddleware.single('avatar'), userController.uploadAvatar)
router.post('/createConv', authMiddleware, userController.createConv)
router.post('/getConv', authMiddleware, userController.getConv)

module.exports = router;