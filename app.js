var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const UserRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use((req, res, next) => {
  //如果token有效，next
  //如果过期了，返回401错误
  if (req.url === '/adminapi/user/login') {
    next();
    return;
  }
  const token = req.headers['authorization'].split(' ')[1];
  if (token) {
    var payload = JWT.verify(token);
    // console.log(payload);
    if (payload) {
      const newtoken = JWT.generate({
        _id: payload._id,
        username: payload.username,
      }, '1d');
      res.header('authorization', newtoken);
      next();
    }
    else {
      res.send(401).send({ error: '-1', errorInfo: 'token过期' });
    }
  }
  else {
    res.send(401).send({ error: '-1', errorInfo: 'token不存在' });
  }
})
app.use(UserRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {


});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
