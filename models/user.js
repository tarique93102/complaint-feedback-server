const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// user schema
var userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        default: 'customer'
    }
});

// creating user mongoose model based on the schema
var User = mongoose.model('User', userSchema);

module.exports = User;