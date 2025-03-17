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
    weather_data: {
        type: [{
            date: { type: String, required: true }, 
            data: { type: Object, required: true },
            //{Report:{type: String, required: true}   }
        }],
        default: [],
    },
 });

 const User = mongoose.model("UserData", UserSchema);
 module.exports = User; 