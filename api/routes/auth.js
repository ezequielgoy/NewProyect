const router = require("express").Router();
const User = require("../model/User");

//register
router.post("/register", async (req, res) =>{
    const newUser = new User({
        username: req.body.username,
        password: req.body.password
    })

    try{
       const user= await newUser.save() 
       res.status(200).json(user)
    }catch(err){
        res.status(500).json(err)
    }
});


//login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      !user && res.status(404).json("user not found");
  
      if (user.password === req.body.password){
        res.status(200).json(user)
      }else{
        res.status(400).json("wrong password");
      };

    } catch (err) {
      res.status(500);
    }
  });

module.exports = router;
