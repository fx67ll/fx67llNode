// 引入环境变量插件
require('dotenv').config({
	path: '../.env'
});

// mongoose插件帮助操作数据库
var mongoose = require('mongoose')

var InitiateMongoServer = async () => {

	//连接MongoDB数据库
	mongoose.connect(process.env.MONGODB_URL)

	//连接成功
	mongoose.connection.on("connected", function() {
		console.log("MongoDB connected success.")
	})

	//连接失败
	mongoose.connection.on("error", function() {
		console.log("MongoDB connected faile.")
	})

	//连接中断
	mongoose.connection.on("disconnected", function() {
		console.log("MongoDB connected disconnected.")
	})
}

module.exports = InitiateMongoServer
