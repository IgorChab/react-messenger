require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    maxHttpBufferSize: 1e8, 
    pingTimeout: 60000, 
    cors: {
        origin: process.env.CLIENT_URL
    }});
const port = process.env.port || 5000;
const router = require('./router');
const errorMiddleware = require('./middlewares/error-middleware');

app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json({extended: true}));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
}));
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

const users = []

io.on('connection', socket => {
    console.log(`user connected`)
    socket.on('add user', id => {
        users[id] = socket.id
        console.log(users)
    })
    // socket.on('get online', contacts => {
    //     const online = contacts.map(id => {
    //         if(users[id] != undefined){
    //             return {userId: id, online: true}
    //         } else{
    //             return {userId: id, online: false}
    //         }
    //     })
    //     socket.emit('get online', online)
    // })
    socket.on('send message', (msg, receiverId) => {
        socket.to(users[receiverId]).emit('send message', msg)
    })
    socket.on('create room', (roomId) => {
        socket.join(roomId)
    })
    // socket.on('notification', (receiverId, info) => {
    //     console.log(info)
    //     console.log(receiverId)
    //     socket.to(users[receiverId]).emit('notification', info)
    // })
    socket.on('room message', (msg, roomId) => {
        console.log(msg)
        socket.broadcast.to(roomId).emit('room message', msg)
    })

})