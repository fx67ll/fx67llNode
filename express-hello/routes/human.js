// 这个文件是第一次写的增删改查，什么内容都没有，完全纯净版增删改查

var express = require('express');
var router = express.Router();
var Human = require('../models/humanModel');

// 查询人物列表
router.get('/getHumanList', function(req, res, next) {
	Human.find({}, function(err, doc) {
		if (err) {
			res.json({
				status: 1,
				msg: err.message
			})
		} else {
			res.json({
				status: 0,
				msg: '查询成功',
				result: doc
			})
		}
	})
});

// 创建人物
router.post('/createHuman', async (req, res) => {
	const user = new Human({
		name: req.body.name,
		age: req.body.age,
		sex: req.body.sex,
		bsList: req.body.bsList
	})
	try {
		const data = await user.save();
		res.send({
			status: 0,
			data: {
				userId: data._id,
				name: data.name,
				age: data.age,
				sex: data.sex,
				bsList: data.bsList
			},
			msg: '创建成功!'
		})
	} catch (error) {
		res.send(error)
	}
});

// 删除人物
router.delete('/deleteHumanById/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Human.deleteOne({
			_id: id
		})
		res.send({
			status: 0,
			msg: '删除成功!'
		})
	} catch (error) {
		res.send('error')
	}
});

// 修改人物
router.put('/updateHumanById/:id', async (req, res) => {
	const {
		id
	} = req.params;
	const bodyParam = req.body;
	try {
		const findUser = await Human.findById(id)
		if (findUser) {
			const data = await Human.updateOne({
				_id: id
			}, bodyParam);
			res.send({
				status: 0,
				data: data,
				msg: '更新成功!'
			})
		} else {
			res.send(findUser)
		}
	} catch (error) {
		res.send(error)
	}
});

// 根据id查询人物
router.get('/getHumanById/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Human.findById(id)
		res.send({
			data: result,
			msg: '查询成功!'
		})
	} catch (error) {
		res.send('error msg')
	}
});

module.exports = router;
