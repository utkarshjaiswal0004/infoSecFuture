
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    email: {
        type: String
    },
    full_name: {
        type: String
    },
    password: {
        type: String
    },
    token: {
        type: String
    },
    user_role: {
        type: String
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    created_at:{
        type: Date,
    },
    updated_at:{
        type: Date
    },
}, { strict: true })

module.exports = mongoose.model('user', userSchema);