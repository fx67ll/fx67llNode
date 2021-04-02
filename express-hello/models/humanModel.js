var mongoose = require('mongoose')

var Schema = mongoose.Schema //用于定义表模型

//创建模型

var humanSchema = new Schema({
	name: {
	    type: String,
	    required: true
	},
	age: {
	    type: String,
	    required: false
	},
	sex: {
	    type: Boolean,
	    required: false
	},
	bsList: {
		type: Array,
		required: false
	}
});
//输出模型

const Human = mongoose.model('human', humanSchema)

module.exports = Human

// 这里需要注意一下，输出的模型名字要和想要关联的数据库表名字相关，如：模型名字是Kecheng，则想要关联的数据库表名要设为Kechengs; 如果没有加s对应，可加第三个参数用于指定需要关联的表。如

// module.exports = mongoose.model('Kecheng',classSchema ,'otherCollectionName')
