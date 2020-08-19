var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var fs = require('fs');
var cors = require('cors')
var app = express();
const qrcode = require('qrcode')
require('dotenv').config()
const appRoute = require('./App/Apis/api');
const mongoose = require('mongoose');
const { createCanvas, loadImage } = require('canvas')
mongoose.connect(process.env.URL || 'mongodb://localhost/food',
  { useNewUrlParser: true })
  .then(() => console.log('MongoDb successsFully Connected!!'))
  .catch(err => console.log('Errror in connecting mongodb', err));
app.use(morgan()); app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/uploads/', express.static('uploads'))
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', appRoute);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  res.send('404 Error caught');
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'production' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
