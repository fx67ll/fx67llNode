var express = require('express')
var router = express.Router()
var Student = require('../models/studentModel')

// 查询学生列表
router.get('/getStudentList', async (req, res) => {
	const {
		pageSize,
		pageIndex,
		startTime,
		endTime
	} = req.query;
	try {
		let userData, total;
		if (startTime.length !== 0 && endTime.length !== 0) {
			userData = await Student.find({
				"birth": {
					"$gte": startTime + "T00:00:00Z",
					"$lt": endTime + "T00:00:00Z"
				}
			}).skip((Number(pageIndex) - 1) * Number(pageSize)).limit(Number(
				pageSize));
			total = await Student.find({
				"birth": {
					"$gte": startTime + "T00:00:00Z",
					"$lt": endTime + "T00:00:00Z"
				}
			}).countDocuments();
		} else {
			userData = await Student.find().skip((Number(pageIndex) - 1) * Number(pageSize)).limit(Number(
				pageSize));
			total = await Student.countDocuments();
		}

		res.send({
			status: 0,
			msg: 'クエリが成功しました!',
			data: userData,
			total
		})
	} catch (error) {
		res.send('error msg')
	}
})

// 创建学生
router.post('/createStudent', async (req, res) => {
	const user = new Student({
		name: req.body.name,
		sex: req.body.sex,
		birth: req.body.birth,
		phone: req.body.phone,
		bro: req.body.bro
	})
	try {
		const data = await user.save();
		res.send({
			status: 0,
			msg: '追加成功!',
			data: {
				studentid: data._id,
				name: data.name,
				sex: data.sex,
				birth: data.birth,
				phone: data.phone,
				bro: data.bro
			}
		})
	} catch (error) {
		res.send(error)
	}
})

// 删除学生
router.delete('/deleteStudentById/:id', async (req, res) => {
	const id = req.params.id;
	try {
		const result = await Student.deleteOne({
			_id: id
		})
		res.send({
			status: 0,
			msg: '削除に成功しました!'
		})
	} catch (error) {
		res.send('error')
	}
})

// 修改学生
router.put('/updateStudentById/:id', async (req, res) => {
	const {
		id
	} = req.params;
	const bodyParam = req.body;
	try {
		const findUser = await Student.findById(id)
		if (findUser) {
			const data = await Student.updateOne({
				_id: id
			}, bodyParam);
			res.send({
				status: 0,
				msg: '修正成功!',
				data: data
			})
		} else {
			res.send(findUser)
		}
	} catch (error) {
		res.send(error)
	}
})

// 根据id查询学生，目前没有什么用
// router.get('/getStudentById/:id', async (req, res) => {
// 	const id = req.params.id;
// 	try {
// 		const result = await Student.findById(id)
// 		res.send({
// 			status: 0,
// 			msg: 'クエリが成功しました!',
// 			data: result,
// 		})
// 	} catch (error) {
// 		res.send('error msg')
// 	}
// })

module.exports = router;
