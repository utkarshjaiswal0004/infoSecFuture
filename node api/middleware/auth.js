let AppUser = require('../models/user');
let jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

let authenticate = async (req, res, next) => {
    try { 
        let token = req.headers.authorization.split(" ")[1];
        let decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    }
    catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        });
    }
}

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 5, // Max requests per windowMs
    message: 'Too many requests, please try again later.',
  });


module.exports = {authenticate, limiter};