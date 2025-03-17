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
            date: { type: String, required: true },  // Store date
            data: { type: Object, required: true }   // Store weather data object
        }],
        default: [],
    },
 });

 const User = mongoose.model("UserData", UserSchema);
 module.exports = User; 