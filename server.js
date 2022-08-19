require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

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
        socket.join(id)

        socket.on('online', userId => {
            console.log(userId)
            console.log('aaaa')
            const online = users[userId]
            if(online){
                var bool = true
            } else {
                var bool = false
            }
            console.log(bool)
            socket.emit('online', bool)
        })
        socket.on('leave room', roomId => {
            socket.leave(id)
            socket.leave(roomId)
        })
        socket.on('create room', (roomId) => {
            socket.join(roomId)
        })
        socket.on('send message', (msg) => {
            console.log(msg)
            socket.broadcast.to(msg.reciver).emit('send message', msg)
        })
        socket.on('notification', receiverId => {
            socket.to(users[receiverId]).emit('notification', '')
        })
        socket.on('room message', (msg, roomId) => {
            console.log(msg)
            socket.broadcast.to(roomId).emit('room message', msg)
        })

        // socket.on('room notice', (roomId, info) => {
        //     console.log(info)
        //     socket.broadcast.to(roomId).emit('room notice', info)
        // })

        socket.on('disconnect', () => {
            delete users[id]
        })
    })
})