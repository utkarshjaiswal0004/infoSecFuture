

const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const winston = require('winston');
const AppUser = require("../models/user");

const generateLogToken = (user) => {
    if (user instanceof AppUser) {
      // User is of type AppUser, proceed with JWT signing
      return jwt.sign(
        {
          _id: user._id || "",
          email: user.email,
          full_name: user.full_name,
        },
        process.env.JWT_KEY,
        {
          expiresIn: "10d",
        }
      );
    } else {
      // Handle the case where user is not of type AppUser
      throw new Error("Invalid user type");
    }
  };

  // Configure Winston logger
  const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
    //   new winston.transports.File({ filename: 'error.log' }),
    ],
  });
  
  // Create a reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });


module.exports = {
    generateLogToken,
    logger,
    transporter
};