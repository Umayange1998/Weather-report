const express = require ("express");
const router = express.Router();
const UserModel = require('./models/User')


app.get('/', async(req, res)=>{
    const user = new UserModel({userName: "Umayange", location: "Colombo", weather_data: "Wait"});
    
    try {
        await user.save();
        res.send("Saved Data");
    } catch(error){
        console.error("error")
    }
    })

module.exports = router;    