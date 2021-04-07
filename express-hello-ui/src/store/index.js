// 下面是一个js文件，用最简单最全的例子展示了全局数据 isShowbckbtn的声明以及改变的方法；
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const store = new Vuex.Store({
	// 存储全局变量
	state: {},
	// 类似computed计算属性，用于从store的state中派生出一些状态，例如过滤并计算，目前来说用不到
	getters: {},
	// 专注于同步修改State，官方推荐大写mutations操作
	mutations: {},
	// 专注于业务代码，可以进行异步操作
	actions: {}
});
export default store;
