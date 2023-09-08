const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const api_version_middleware = require('./middleware/api_version_middleware'); // Import the middleware
dotenv.config();

const indexRouter = require('./routes/index');
const appUser = require(`./routes/api/${process.env.API_Version}/user`);

const app = express();
// Configure CORS middleware
app.use(cors({ credentials: true, origin: process.env.frontend }));

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Define your routes here
app.use('/', indexRouter);
// Use the API version middleware
app.use(api_version_middleware);
app.use(`/api/${process.env.API_Version}/user`, appUser);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// MongoDB connection
mongoose.connect(process.env.db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ' + err);
  });

// Export the app
module.exports = app;
