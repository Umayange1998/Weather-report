const express = require('express');
const mongoose = require("mongoose");
const app= express();
const cors = require('cors');


const UserModel = require('./models/User')

app.use(express.json());
app.use(cors()); 

mongoose.connect("mongodb+srv://wgikumayange:Password12345@weatherreportdata.kumz3.mongodb.net/weatherreportappdata?retryWrites=true&w=majority&appName=weatherreportdata",{
    useNewUrlParser: true,
});

const usersRouter = require('./routes/user');

app.use("/users", usersRouter);

app.listen(3001,()=>{
    console.log("Server is running on port 3001")
});