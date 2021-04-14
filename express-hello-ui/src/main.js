import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'

Vue.config.productionTip = false

import less from 'less'
Vue.use(less)

import "normalize.css";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

// 统一成功弹窗
Vue.prototype.msgOK = function(msg) {
	this.$message.success({
		message: msg,
		duration: 2000,
		showClose: false
	});
}
// 统一错误弹窗
Vue.prototype.msgError = function(msg) {
	this.$message.error({
		message: msg,
		duration: 2000,
		showClose: false
	});
}
// 权限成功弹窗
Vue.prototype.authOK = function(tip, msg) {
	this.$notify.success({
		title: tip,
		message: msg,
		duration: 2000,
		showClose: false
	});
}
// 权限失败弹窗
Vue.prototype.authError = function(tip, msg) {
	this.$notify.error({
		title: tip,
		message: msg,
		duration: 2000,
		showClose: false
	});
}


new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
