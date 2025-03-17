const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const axios = require('axios');

// initiate a user
router.post("/", async (req, res) => {
  try {
    const { userName, location } = req.body;

    if (!userName || !location) {
        return res.status(400).json({ message: "userName and location are required" });
      }
      
    const user = new UserModel({ userName, location, weather_data: [] });
    await user.save();

    await updateUserWeatherData(user, location);


    res.status(201).send("Saved Data");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// update user location

router.put("/:userName", async (req, res)=>{
    try {
        const { location } = req.body;
        const user = await UserModel.findOneAndUpdate({ userName: req.params.userName }, { location }, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });

        await updateUserWeatherData(user, location);

        res.status(200).json({ message: 'Location updated successfully', user });
        } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const updateUserWeatherData = async (user, location) => {
    try {
      // Fetch weather data
      const weatherData = await fetchWeather(location);
  
      // Get today's date in YYYY-MM-DD format
      const today = new Date().toISOString().split('T')[0];
  
      // Update the user's weather data
      user.weather_data.push({ date: today, data: weatherData });
      await user.save();
  
      // Optionally send the weather report to the user via email
    //   await sendEmail(user.email, `Weather update for ${location}: ${JSON.stringify(weatherData)}`);
    } catch (error) {
      console.error("Error updating weather data:", error);
      throw error;  // Propagate error so the calling function can handle it
    }
  };
// fetch weather data from OpenWeatherMap API
const fetchWeather = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ced8c8ae9bd6fc83d048a8968966abdf`;
    const response = await axios.get(url);
    return response.data;
};
module.exports = router;
