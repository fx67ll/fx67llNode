import Vue from 'vue'
import Router from 'vue-router'
import {
	getToken
} from '@/utils/auth'
import {
	Notification,
	MessageBox,
	Message
} from 'element-ui'

Vue.use(Router)

// 修复路由重复报错
// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

import store from '@/store/index.js'

export const fx67llRoutes = [{
	path: '/',
	name: 'login',
	component: () => import('@v/login.vue') //登录页
}, {
	path: '/index',
	name: 'index',
	component: () => import('@v/index.vue') //首页
}]

const router = new Router({
	mode: 'hash', // history模式，去掉url中的#
	scrollBehavior: () => ({
		y: 0
	}),
	routes: fx67llRoutes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
	// next() // 必须使用 next ,执行效果依赖 next 方法的调用参数
	if (to.fullPath === '/') {
		if (getToken()) {
			next({
				name: 'index'
			})
		} else {
			next()
		}
	} else {
		if (getToken()) {
			next()
		} else {
			Notification.error({
				title: '警告',
				message: '没有权限请先登录',
				showClose: false
			});
			next({
				name: 'login'
			})
		}
	}
})

export default router
