const router = require("express").Router();
const Message = require("../model/Message");

//Send msg
router.post("/", async (req,res) =>{
    const newMessage = new Message({
        roomId: req.body.roomId,
        roomName: req.body.roomName,
        sender: req.body.sender,
        text: req.body.text,
        state: false
    });
    try{
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage);
    }catch(err){
        res.status(500).json(err)
    }
})
//read msg
router.put("/read/:roomid"), async (req,res) =>{
    try{
        const message = await Message.find({roomId: req.params.roomid})
        const updatedMessages = message.update({$set: {state : true}})
        res.status(200).json(updatedMessage)
    }catch(err){
        res.status(500).json(err)
    }
}

// Get msg

router.get("/:roomId" , async (req,res) =>{
    try{
        const messages = await Message.find({
            roomId: req.params.roomId
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err)
    }
})


//get user msg
router.get("/getusermsg" , async (req,res) =>{
    try{
        const messages = await Message.find({
            roomId: req.body.roomId,
            sender: req.body.sender
        });
        res.status(200).json(messages);
    }catch(err){
        res.status(500).json(err)
    }
})

// Dlt msg

router.delete("/delmsg/:roomId/:sender" , async (req,res) =>{
    try{
        const messages = await Message.deleteMany({
            roomId: req.params.roomId,
            sender: req.params.sender
        });
        
        res.status(200).json("Se borraron los msg");
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;