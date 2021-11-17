const mongoose = require('mongoose');


const RoomSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        unique: true,
    },
    members:{
        type: Array
    }
},
{timestamps:true}
);

const Room = mongoose.model('Room', RoomSchema);

module.exports=Room;