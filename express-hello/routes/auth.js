const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
// 格式验证插件
const {
	check,
	validationResult
} = require('express-validator');
// 加密插件
const bcrypt = require('bcryptjs');
// token插件
const jwt = require('jsonwebtoken');

// 注册接口
router.post('/signup',
	[
		check('userName', '用户名格式错误！')
		.not()
		.isEmpty(),
		check('passWord', '密码格式错误！').isLength({
			min: 6
		}),
		check('email', '邮箱格式错误！').isEmail(),
		check('phone', '手机号格式错误').isMobilePhone()
	],
	async (req, res) => {
		const error = validationResult(req);
		if (!error.isEmpty()) {
			return res.status(400).json({
				status: 400,
				msg: '注册失败！',
				error: error.array()
			});
		};

		const {
			userName,
			passWord,
			email,
			phone,
			createDate,
			updateDate
		} = req.body;

		try {
			// 匹配用户名，邮箱，手机号，是否有注册过
			let userByName = await User.findOne({
				userName
			});
			let userByEmail = await User.findOne({
				email
			});
			let userByPhone = await User.findOne({
				phone
			});
			if (userByName) {
				return res.status(400).json({
					status: 400,
					msg: '用户名已注册！'
				});
			};
			if (userByEmail) {
				return res.status(400).json({
					status: 400,
					msg: '邮箱已注册！'
				});
			};
			if (userByPhone) {
				return res.status(400).json({
					status: 400,
					msg: '手机号已注册！'
				});
			};

			// 开始注册
			let user = new User({
				userName,
				passWord,
				email,
				phone,
				createDate,
				updateDate
			});

			// 加盐就是系统生成一串随机值，混入原始密码中，然后按照加密方式生成一串字符串保存在服务器
			const salt = await bcrypt.genSalt(10);
			// console.log('saltHash', salt);

			// 用户的密码经过加密后存储在服务器
			user.passWord = await bcrypt.hash(passWord, salt);
			await user.save();

			// 用户id当做签参数
			const payload = {
				user: {
					id: user.id
				}
			};
			// console.log('payload', payload);

			// 签发token
			jwt.sign(
				payload,
				'randomString', {
					expiresIn: 10000
				},
				(err, token) => {
					if (err) {
						throw err;
					};
					res.status(200).json({
						status: 0,
						msg: '注册成功！',
						token: token
					});
				}
			);

		} catch (error) {
			console.log(error);
			res.status(500).json({
				status: 500,
				msg: '注册服务异常！',
				error: error.message
			});
		};
	}
);


// 登录接口
router.post('/login',
	[
		check('userName', '用户名格式错误！')
		.not()
		.isEmpty(),
		check('passWord', '密码格式错误！').isLength({
			min: 6
		})
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({
				status: 400,
				msg: '登录失败！',
				error: errors.array()
			});
		};

		const {
			userName,
			passWord
		} = req.body;

		try {
			// 匹配用户
			let user = await User.findOne({
				userName
			});
			if (!user) {
				return res.status(400).json({
					status: 400,
					msg: '用户不存在！'
				});
			};

			// 匹配密码
			// console.log('passWord', passWord);
			const isMatch = await bcrypt.compare(passWord, user.passWord);
			if (!isMatch) {
				return res.status(400).json({
					status: 400,
					msg: '密码错误！'
				})
			};

			// 准备签发参数
			const payload = {
				user: {
					id: user.id
				}
			};
			// console.log('payload', payload);

			// 签发token
			jwt.sign(
				payload,
				'randomString', {
					expiresIn: 3600
				},
				(err, token) => {
					if (err) throw err;
					res.status(200).json({
						status: 0,
						msg: '登录成功！',
						data: {
							userName: user.userName
						},
						token: token
					});
				}
			);

		} catch (error) {
			console.log(error);
			res.status(500).json({
				status: 500,
				msg: '登录服务异常！',
				error: error.message
			});
		};

	}
);

module.exports = router;
