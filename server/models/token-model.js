const {Schema, model} = require('mongoose');
const tokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    refreshToken: {
        type: String,
        required: true
    }
})

module.exports = model('Token', tokenSchema)