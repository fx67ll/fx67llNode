const mongoose = require('mongoose');

// 规定user集合有哪些属性（相当于表的列数）_id自动生成
const userSchema = new mongoose.Schema({
	// 用户名
	userName: {
		type: String,
		required: true
	},
	// 密码
	passWord: {
		type: String,
		required: true
	},
	// 邮箱地址
	email: {
		type: String,
		required: true
	},
	// 手机号
	phone: {
		type: String,
		required: true
	},
	// 注册时间
	createDate: {
		type: Date,
		default: Date.now()
	},
	// 修改时间
	updateDate: {
		type: Date,
		default: Date.now
	}
}, {
	versionKey: false,
	timestamps: {
		createdAt: 'createDate',
		updatedAt: 'updateDate'
	}
});

const User = mongoose.model('user', userSchema); // 这里的user相当于mongodb数据库集合（表）

module.exports = User;
