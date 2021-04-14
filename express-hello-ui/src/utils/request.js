import axios from 'axios'
import {
	Notification,
	MessageBox,
	Message
} from 'element-ui'
import {
	getToken,
	removeToken
} from '@/utils/auth'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
	// axios中请求配置有baseURL选项，表示请求URL公共部分
	baseURL: process.env.VUE_APP_BASE_API,
	// 超时
	timeout: 10000
})
// request拦截器
service.interceptors.request.use(config => {
	// 是否需要设置 token
	// const isToken = (config.headers || {}).isToken === false
	// if (getToken() && !isToken) {
	//   config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	// }
	const isToken = (config.headers || {}).isToken === false
	if (getToken() && !isToken) {
		config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
	}
	// get请求映射params参数
	if (config.method === 'get' && config.params) {
		let url = config.url + '?';
		for (const propName of Object.keys(config.params)) {
			const value = config.params[propName];
			var part = encodeURIComponent(propName) + "=";
			if (value !== null && typeof(value) !== "undefined") {
				if (typeof value === 'object') {
					for (const key of Object.keys(value)) {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						url += subPart + encodeURIComponent(value[key]) + "&";
					}
				} else {
					url += part + encodeURIComponent(value) + "&";
				}
			}
		}
		url = url.slice(0, -1);
		config.params = {};
		config.url = url;
	}
	return config
}, error => {
	console.log('请求异常' + error)
	Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(res => {
		// 未设置状态码则默认成功状态
		const code = res.data.status || 0;
		// 获取错误信息
		const msg = res.data.msg || '系统未知错误，请反馈给管理员！'
		if (code !== 0) {
			if (code === 401) {
				Notification({
					type: 'warning',
					title: '警告',
					message: msg,
					duration: 2000,
					showClose: false
				})
				removeToken();
				setTimeout(function() {
					location.reload();
				}, 1000)
			} else
			if (code === 400) {
				Notification({
					type: 'error',
					title: '错误',
					message: msg,
					duration: 2000,
					showClose: false
				})
			} else
			if (code === 500) {
				Message({
					type: 'error',
					message: msg,
					duration: 2000,
					showClose: false
				})
				return Promise.reject(new Error(msg))
			} else {
				Message({
					type: 'error',
					message: msg,
					duration: 2000,
					showClose: false
				})
				return Promise.reject('error')
			}
		} else {
			return res.data
		}
	},
	error => {
		console.log('err' + error)
		let {
			message
		} = error;
		if (message == "Network Error") {
			message = "后端接口连接异常";
		} else if (message.includes("timeout")) {
			message = "系统接口请求超时";
		} else if (message.includes("Request failed with status code")) {
			message = "系统接口" + message.substr(message.length - 3) + "异常";
		}
		Message({
			type: 'error',
			message: message,
			duration: 2000,
			showClose: false
		})
		return Promise.reject(error)
	}
)

export default service
