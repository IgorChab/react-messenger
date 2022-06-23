const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {maxHttpBufferSize: 1e8, pingTimeout: 60000});
const port = process.env.port || 5000;
const user = require('./models/user');

app.use(bodyParser.json())

const start = async () => {
    try {
        await mongoose
            .connect('mongodb://localhost:27017/react-messenger-db', {
                useNewUrlParser: true,
            })
            .then(() => console.log('MongoDb connected'))

            server.listen(port, () => console.log(`server is up. port: ${port}`));
    } catch (e) {
        console.log(e);
    }

}

start();

app.get('/api', (req, res) => {
    res.json({
        message: "hello world!"
    })
})

app.post('/register', async (req, res) => {
    await user.findOne({email: req.body.email}).then(candidate => {
        if(candidate){
            res.end(JSON.stringify({error: 'Пользователь стаким email уже существует'}))
        } else {
            const hashPass = bcrypt.hashSync(req.body.password, 10)
            user.create({
                username: req.body.username,
                email: req.body.email,
                password: hashPass
            })
        }
    })
})