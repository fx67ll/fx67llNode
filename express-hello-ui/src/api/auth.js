// 权限接口
import request from '@/utils/request'

// 注册
export function signup(data) {
	return request({
		url: '/signup',
		method: 'post',
		data: data
	})
}

// 登录
export function login(data) {
	return request({
		url: '/login',
		method: 'post',
		data: data
	})
}
