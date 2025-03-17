# Weather Report API

## Overview
This is a Node.js API application that stores users' email addresses and locations in a MongoDB database and sends hourly weather reports via email every 3 hours. The weather data is fetched using the OpenWeatherMap API, and the email report includes weather information for the users' location. The application also supports updating user location and fetching the weather data for a specific day.

## Features
- Store user details such as email (used as username) and location.
- Update user location.
- Fetch weather data for a user on a specific day.
- Send hourly weather reports to users via email.
- Use the OpenWeatherMap API to fetch real-time weather data.
- Email reports are sent every 3 hours using Nodemailer and Gmail.
- Option to generate a weather report text using the OpenAI API (commented out).
- API routes for storing, updating, and retrieving user data.

## Requirements
- Node.js
- MongoDB (MongoDB Atlas is used for cloud database)
- Express.js
- Mongoose (for MongoDB integration)
- Axios (for making HTTP requests)
- Nodemailer (for sending emails)
- OpenAI API (for generating text-based weather reports) [Optional]
- dotenv (for managing environment variables)

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <project-directory>