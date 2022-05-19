var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var validateRequest = require('./middleware/requestAuthenticator');
var authenticatedRoute = require('./routes/api');
var cors = require('cors');



var app = express();

// view engine setup



var allowedOrigins = ['http://localhost:5500',
                      'http://127.0.0.1:5500','undefined'];


var corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS with origin ' + origin))
    }
  },
  credentials: true
}

app.use(cors(corsOptions));


// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());






app.use('/api', authenticatedRoute);


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });



// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500).json({
//     message: err.message,
//     error: err
// });


// });


const PORT = 8080;
const HOST = '0.0.0.0';

app.listen(PORT, HOST);










module.exports = app;
