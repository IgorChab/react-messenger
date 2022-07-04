const Router = require('express').Router;
const userController = require('./controllers/user-controller');

const router = new Router();

router.post('/register', userController.registration)
router.post('/login', userController.login)
router.get('/activate/:link', userController.activate)
router.post('/logout', userController.logout)

module.exports = router;