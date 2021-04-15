var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var ejs = require('ejs');
var logger = require('morgan');

// 连接数据库
var InitiateMongoServer = require('./mongodb/index');
InitiateMongoServer();

// 前三个是基础学习时候用到路由，暂时不需要
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var humanRouter = require('./routes/human');
var authRouter = require('./routes/auth');
var studentRouter = require('./routes/student');

var app = express();

// 解决跨域问题，仅做部署使用，平时开发前端直接nginx代理一下就行了
var cors = require('cors');
// app.use(cors({
// 	// 配置Access-Control-Allow-Origin CORS标头
// 	// 设置origin为有效来源数组
// 	origin: ['http://211.149.128.130:83','http://node.fx67ll.com'],
// 	// 提供状态代码以用于成功请求
// 	optionsSuccessStatus: 200,
// 	// 配置Access-Control-Allow-Methods CORS标头
// 	// 期望以逗号分隔的字符串（例如：'GET，PUT，POST'）或数组
// 	// 目前只有这四种标头，够用了
// 	methods: ['GET', 'POST', 'PUT', 'DELETE'],
// 	// 配置Access-Control-Allow-Headers CORS标头
// 	// 期望以逗号分隔的字符串（例如：'Content-Type，Authorization'）或数组
// 	// 如果未指定，则默认为反映在请求的Access-Control-Request-Headers标头中指定的标头
// 	// 如果你的标头没有以下项，请求不予通过，我设置了自定义的token，所以必须再加个token在数组中
// 	allowedHeaders: ['Content-Type','Authorization','token']
// }));

// 设置模板引擎，使用这里代码的时候注意放开上面的引用注释，但是这个引擎目前还不知道有什么用
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');
// app.engine('.html', ejs.__express);

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

// 访问静态资源，不然无法在3000端口下访问，貌似这里可以代替引用模板引擎
app.use(express.static(path.join(__dirname, 'views')));

// 设置路由，就是请求路径
// 前三个是基础学习时候用到路由，暂时不需要
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/human', humanRouter);
app.use('/', authRouter);
app.use('/student', studentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
