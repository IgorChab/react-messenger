const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    reciver: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
    time: {
        type: String
    },
    media: {
       type: Object 
    }
})

module.exports = mongoose.model('message', messageSchema)