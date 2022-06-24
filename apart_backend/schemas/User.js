const mongoose = require('mongoose');
const user = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: Array,
    },
    password:{
        type: String,
        required: true
    },
    profile:{
        type:String
    }
},{timestamps: true});

module.exports = mongoose.model('user', user);