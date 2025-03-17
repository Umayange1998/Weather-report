 const mongoose =  require('mongoose');

 const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    weather_data:  {
        type: String,
        required: true,
    },
 });

 const User = mongoose.model("UserData", UserSchema);
 module.exports = User; 