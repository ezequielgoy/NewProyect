const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require: true,
        min:3,
        max:20,
        unique:true
    },
    password:{
        type:String,
        require: true,
        min:4
    }
});

const User = mongoose.model('User', UserSchema);

module.exports=User;