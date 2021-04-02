var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var ejs = require('ejs');ss
var logger = require('morgan');

// 连接数据库
var InitiateMongoServer = require('./mongodb/index');
InitiateMongoServer();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var humanRouter = require('./routes/human');
var studentRouter = require('./routes/student');

var app = express();

// 设置模板引擎
// app.set('views', path.join(__dirname, 'views'));
// app.engine('.html', ejs.__express);
// app.set('view engine', 'html');

// 输出日志
app.use(logger('dev'));

// 解析json
app.use(express.json());
// 解析表单
app.use(express.urlencoded({
	extended: false
}));
// 解析Cookie
app.use(cookieParser());

// 访问静态资源
app.use(express.static(path.join(__dirname, 'views')));

// 设置路由，就是请求路径
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/human', humanRouter);
app.use('/student', studentRouter);

// 解决跨域问题
// var cors = require('cors');
// app.use(cors());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	// 解决跨域问题
	// res.header('Access-Control-Allow-Origin', '*')
	// res.header('Access-Control-Allow-Headers',
	// 	'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method')
	// res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
	// res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
	next(createError(404));
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
