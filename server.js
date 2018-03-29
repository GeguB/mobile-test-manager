var express       = require('express');
var app           = express();
var session       = require('express-session');
var createError   = require('http-errors');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var logger        = require('morgan');
var mongoose      = require('mongoose');
var passport      = require('passport');
// var multer        = require('multer');



mongoose.connect('mongodb://localhost/mobile-test-manager');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.use('/static', express.static(__dirname, 'public'))

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// multer();
app.use(passport.initialize());
app.use(passport.session());

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


require("./app/app.js")(app);

app.listen(3000);