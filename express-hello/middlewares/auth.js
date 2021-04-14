// 生成token插件
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	// token和Authorization有什么区别吗？
	// const token = req.header("Authorization");
	const token = req.header("token");
	// 如果添加了status参数就会直接反应在响应中，如果想要前端用返回信息的状态码判断，直接返回就行，状态码用200代替表示请求成功但是响应的内容有问题
	// if (!token) return res.status(401).json({
	// 	status: 401,
	// 	msg: '权限错误，请登录!'
	// })
	if (!token) return res.json({
		status: 401,
		msg: '权限错误，请登录!'
	})

	try {
		const decoded = jwt.verify(token, 'randomString');
		// decoded.user包含用户的ID，也就是login或者signup时的payload参数，并存储到请求参数中
		req.user = decoded.user;
		next();
	} catch (e) {
		console.log(e);
		// res.status(500).send({
		// 	status: 500,
		// 	msg: '身份失效，请重新登录！'
		// })
		res.send({
			status: 401,
			msg: '身份失效，请重新登录！'
		})
	}
};