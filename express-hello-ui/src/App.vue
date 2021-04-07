<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name: 'app',
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style lang="less">
html,
body {
	width: 100%;
	height: 100%;
	margin: 0;
	padding: 0;
	font-family: 'PFR';
	color: @grey;
}
#app {
	width: 100%;
	height: 100%;
}
</style>
