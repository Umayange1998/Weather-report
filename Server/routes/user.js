const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");
const axios = require('axios');
const cron = require('node-cron');
const { OpenAI } = require('openai');
const nodemailer = require('nodemailer');
require('dotenv').config();


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,  // update email address in .env file
        pass: process.env.GMAIL_PASS   // update  app-specific email password in .env file
    }
});
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


//   const Report = await generateWeatherText(weatherData)

      // Update the user's weather data
      user.weather_data.push({ date: today, data: weatherData, 
//report: Report
 });

 
 await sendEmail(user.userName, weatherData);

      await user.save();
  
        } catch (error) {
      console.error("Error updating weather data:", error);
      throw error;  
    }
  };

//   const generateWeatherText = async (weatherData) => {
//     const prompt = `Generate a weather report based on the following data: ${JSON.stringify(weatherData)}`;
//     const response = await openai.completions.create({
//         model:'gpt-3.5-turbo',
//         prompt: prompt,
//         max_tokens: 150,
//     });

//     return response.choices[0].text.trim();
// };
// fetch weather data from OpenWeatherMap API
const fetchWeather = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=ced8c8ae9bd6fc83d048a8968966abdf`;
    const response = await axios.get(url);
    return response.data;
};

// Function to send email to users
const sendEmail = async (userName, weatherData) => {
    const mailOptions = {
        from: process.env.GMAIL_USER,  // Sender's email
        to: userName,  // Receiver's email (email as username)
        subject: "Hourly Weather Report",
        text: JSON.stringify(weatherData, null, 2),  // Send raw weather data in a readable format
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Weather report sent to ${userName}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
module.exports = router;
