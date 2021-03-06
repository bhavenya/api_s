'use strict';
const debuglog = require('util').debuglog('example');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var json2csv = require('json2csv');
var fs = require('fs');
var path = require('path');
global.appRoot = path.resolve(__dirname);


var cassandrar = require ('./routes/cassandrar');
var visualize = require ('./routes/visualize');
var training = require ('./routes/training');
var index = require('./routes/index');


var app = express();
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/cassandrar',cassandrar);
app.use('/visualize',visualize);
app.use('/training',training);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(req, res, next) {
  var err2 = new Error('Enter Year');
  err.status = 304;
  next(err2);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
