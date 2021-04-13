var mongoose = require('mongoose');

//用于定义表模型
var Schema = mongoose.Schema;

//创建模型
var studentSchema = new Schema({
	// 姓名
	name: {
		type: String,
		required: true
	},
	// 性别
	sex: {
		type: Boolean,
		required: false
	},
	// 生日
	birth: {
		type: Date,
		required: true
	},
	// 联系电话
	phone: {
		type: String,
		required: true
	},
	// 关联学员
	bro: {
		type: String,
		required: true
	},
	// 创建时间
	createTime: {
		type: Date,
		default: Date.now
	},
	// 更新时间
	updateTime: {
		type: Date,
		default: Date.now
	}
}, {
	versionKey: false,
	timestamps: {
		createdAt: 'createTime',
		updatedAt: 'updateTime'
	}
});

// 输出模型
const Student = mongoose.model('student', studentSchema);
module.exports = Student;
