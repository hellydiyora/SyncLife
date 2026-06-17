const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName :
    {
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    birthDate:{
        type:Date,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    nickname:{
        type:String,
        default: "",
    },
    bio:{
        type:String,
        default: "",
    },
    phoneNumber:{
        type:String,
        default: "",
    },
    favoriteQuote:{
        type:String,
        default: "",
    },
});

const User = mongoose.model('User' , userSchema);

module.exports = User;