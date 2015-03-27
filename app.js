var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var users = require('./model/users');

var session = require('express-session');

var routes = require('./routes/index');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret:'ID007test', saveUninitialized:true, resave: true}));

app.use(function(req,res,next){

    console.log("requrl: "+ req.url);
    var userName = req.session.userName;
    var password = req.session.password;
    if(typeof(userName)=== "undefined"||typeof(password)=== "undefined"){

        userName = req.body.userName;
        password = req.body.password;
        if(typeof(userName)!== "undefined"||typeof(password)!== "undefined"){

            console.log("username2: "+userName);
            console.log("pass2: "+password);
            if(users.check(userName, password)){

                console.log("DAMDAM: if");
                req.session.userName= userName;
                req.session.password= password;
                return res.redirect('/');
            } else{

                console.log("DAMDAM: else");
                req.url = '/login';
                req.method = 'get';
                return next();
            }
        } else{

            req.url = '/login';
            req.method = 'get';
            return next();
        }
    }else{

        return next();
    }

});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
