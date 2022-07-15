const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }
})

module.exports = mongoose.model('message', messageSchema)