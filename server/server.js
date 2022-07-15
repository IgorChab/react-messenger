const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {maxHttpBufferSize: 1e8, pingTimeout: 60000});
const port = process.env.port || 5000;
require('dotenv').config();
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
