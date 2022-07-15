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
router.post('/findUser', authMiddleware, userController.findUser)
router.post('/uploadAvatar', authMiddleware, fileMiddleware.single('avatar'), userController.uploadAvatar)
router.get('/createContact/:friendId', authMiddleware, userController.createContact)
router.get('/getContacts/:userId', authMiddleware, userController.getContacts)
router.post('/createRoom', authMiddleware, fileMiddleware.single('avatar'), userController.createRoom)
router.get('/getRooms', authMiddleware, userController.getRooms)
module.exports = router;