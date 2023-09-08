
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let tokenSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    token: {
        type: String,
        required: true
    },
    valid_for_sec:{
        type: Number,
        default: 0
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
}, { strict: true })

module.exports = mongoose.model('token', tokenSchema);