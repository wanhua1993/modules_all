var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var log4js = require('log4js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 设置魔板引擎
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', require('ejs').__express);
// 静态资源 post请求
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 解决跨域 问题
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Content-Type", "text/html");
  next();
});
// session 模块
app.use(session({
  secret: 'sessiontest',//与cookieParser中的一致
  resave: true,
  saveUninitialized: true
}));
// 日志模块
log4js.configure('./config/log4js.json');
var logger = log4js.getLogger('log_file');
app.use(log4js.connectLogger(logger, { level: 'auto', format: ':method :url :date :status' }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
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
