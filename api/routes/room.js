const router = require("express").Router();
const Room = require ('../model/Room');
const User = require ('../model/User')

//Create Room
router.post("/:id/createroom", async(req,res) =>{
    const newRoom = new Room({
        name: req.body.name,
        members: req.params.id
    })
    const user = await User.findById(req.params.id);
    try{
        const room = await newRoom.save()
        res.status(200).json("Room has been created")
        }
    catch(err){
        res.status(500).json(err)
    }
});


//get rooms
router.get("/:id", async(req,res)=>{
    const user = await User.findById(req.params.id);
    try{
        const room = await Room.find({
            members: { $in: [req.params.id] }}) ;
        res.status(200).json(room)
    }catch (err){
        res.status(500).json(err)
    }
    
});
//get rooms by name
router.get("/", async(req,res)=>{
    try{
        const room = await Room.findOne({
            name: { $in: [req.body.room] }}) ;
        res.status(200).json(room)
    }catch (err){
        res.status(500).json(err)
    }
    
});

module.exports = router;
