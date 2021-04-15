<template>
	<div class="login-box" :class="this.isLogin ? 'form-success' : ''">
		<div class="container">
			<h1>Welcome</h1>

			<div class="form" :class="this.isLogin ? 'fadeout' : 'fadein'">
				<input v-model="loginFrom.userName" type="text" placeholder="Username" />
				<input v-model="loginFrom.passWord" type="password" placeholder="Password" />
				<el-button @click="handleLogin()">Login</el-button>
			</div>
		</div>

		<ul class="bg-bubbles" @click="showTips()">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>

		<div class="fx67ll-footer">
			Designed & Powered by
			<a href="https://fx67ll.com" target="_blank">fx67ll</a>
			&#12288; Copyright© 2018-{{ this.year }}&#12288;
			<a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">皖ICP备18017174号-2</a>
		</div>
	</div>
</template>

<script>
import { login } from '@api/auth.js';
import moment from 'moment';
import Cookies from 'js-cookie';

export default {
	name: 'nodeLogin',
	data() {
		return {
			// footer
			year: moment().format('YYYY'),
			// 判断是否在登录
			isLogin: false,
			// 登录表单
			loginFrom: {
				userName: '',
				passWord: ''
			}
		};
	},
	methods: {
		handleLogin() {
			var self = this;
			if (this.loginFrom.userName !== '' && this.loginFrom.passWord !== '') {
				this.isLogin = true;
				login(this.loginFrom).then(res => {
					Cookies.set('User-Token', res.token);
					this.authOK('提示', '登录成功！');
					setTimeout(function() {
						self.$router.push({
							name: 'index'
						});
					}, 600);
				});
				setTimeout(function() {
					self.isLogin = false;
					self.loginFrom = {
						userName: '',
						passWord: ''
					};
				}, 1000);
			} else {
				this.authError('警告', '账号或密码不能为空！');
			}
		},
		showTips() {
			this.authOK('游客提示', '游客可以使用 admin/123456 访问');
		}
	}
};
</script>

<style lang="less" scoped="scoped">
@import '@a/styles/login.less';
</style>
