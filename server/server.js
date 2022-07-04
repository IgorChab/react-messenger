const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {maxHttpBufferSize: 1e8, pingTimeout: 60000});
const port = process.env.port || 5000;
const jwt = require('jsonwebtoken');
require('dotenv').config();
const router = require('./router');
const errorMiddleware = require('./middlewares/error-middleware')

app.use(bodyParser.json())
app.use(cookieParser());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose
            .connect(process.env.DB_URL, {
                useNewUrlParser: true,
            })
            .then(() => console.log('MongoDb connected'))

            server.listen(port, () => console.log(`server is up. port: ${port}`));
    } catch (e) {
        console.log(e);
    }

}

start();

// app.get('/api', jwtMiddleware, (req, res) => {
//     res.json({
//         message: "hello world!"
//     })
// })

// app.post('/register', async (req, res) => {
//     await user.findOne({email: req.body.email}).then(candidate => {
//         if(candidate){
//             res.end(JSON.stringify({error: 'Пользователь стаким email уже существует'}))
//         } else {
//             const hashPass = bcrypt.hashSync(req.body.password, 5)
//             user.create({
//                 username: req.body.username,
//                 email: req.body.email,
//                 password: hashPass
//             })
//             res.end(JSON.stringify({success: true}))
//         }
//     })
// })

// app.post('/login', async (req, res) => {
//     await user.findOne({email: req.body.email}).then(user => {
//         if (!user) {
//             res.end(JSON.stringify({emailError: `Пользователь с такой почтой не найден`}))
//         } else {
//             const validPass = bcrypt.compareSync(req.body.password, user.password)
//             if (!validPass){
//                 res.end(JSON.stringify({passwordError: `Пользователь с таким паролем не найден`}))
//             } else {
//                 //jwt & redirect to chat
//                 const token = jwt.sign({
//                     auth: true,
//                     userId: user._id
//                 }, process.env.SECRET_KEY, {expiresIn: '24h'})
//                 res.end(JSON.stringify({
//                     success: true,
//                     token: token
//                 }))
//             }
//         }
//     })
// })

// app.post('/logout', (req, res) => {
//     res.redirect('/')
// })