const router = require('express').Router();
const User = require ('../model/User');
const Room = require ('../model/Room');
const Message = require('../model/Message');


//send msg
router.post("/:id/:room/sendmessage", async(req,res)=>{
    const user = await User.findById(req.params.id);
    const room = await Room.findById(req.params.room);
    const newMessage = new Message({
        roomId: room._id,
        sender: user.username,
        text: req.body.text,
        state: false
    })
    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err)
    }
})



//join room
router.put("/:id/join", async(req,res) =>{
    try{
        const room = await Room.findOne({name: {$in : req.body.name}})
        await room.updateOne({$push: {members: req.params.id}})
        res.status(200).json(room)
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router