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
		showClose: true,
		duration: 2000,
		message: msg
	});
}
// 统一错误弹窗
Vue.prototype.msgError = function(msg) {
	this.$message.error({
		showClose: true,
		duration: 2000,
		message: msg
	});
}

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
