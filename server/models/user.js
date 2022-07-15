const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    },
    activationLink: {
        type: String
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    profilePhoto: {
        type: String
    }
})

module.exports = mongoose.model('user', userSchema);