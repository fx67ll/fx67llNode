<template>
	<div class="login-box">
		<div class="container">
			<h1>Welcome</h1>

			<form class="form">
				<input type="text" placeholder="Username" />
				<input type="password" placeholder="Password" />
				<button type="submit" id="login-button">Login</button>
			</form>
		</div>

		<ul class="bg-bubbles">
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
import moment from 'moment';
export default {
	name: 'nodeLogin',
	data() {
		return {
			// footer
			year: moment().format('YYYY')
		};
	}
};
</script>

<style lang="less" scoped="scoped">
@import '@a/styles/login.less';
</style>
