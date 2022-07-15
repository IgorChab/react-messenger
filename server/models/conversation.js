const mongoose = require('mongoose');
const conversationSchema = new mongoose.Schema({
    senderId: {
        type: String
    },
    reciverId: {
        type: String
    }
})

module.exports = mongoose.model('conversation', conversationSchema)