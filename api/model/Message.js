const { timeStamp } = require('console');
const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema(
    {
        roomId:{
            type: String
        },
        roomName:{
            type:String
        },
        sender:{
            type: String
        },
        text:{
            type: String
        },
        time:{
            type: String
        },
        state:{
            type: Boolean,
            default:false
        }
    },
    {timestamps: true}
);

const Message = mongoose.model('Message', MessageSchema);

module.exports=Message;