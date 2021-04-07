const path = require("path");

function resolve(dir) {
	return path.join(__dirname, dir)
}

// 添加全局less文件
function addStyleResource(rule) {
	rule
		.use("style-resource")
		.loader("style-resources-loader")
		.options({
			// 这里暂时保留加载多个全局less的方式
			// patterns: [path.resolve(__dirname, "./src/assets/styles/mixin.less"), path.resolve(__dirname,
			// 	"./src/assets/styles/test.less")],
			patterns: [path.resolve(__dirname, "./src/assets/styles/mixin.less")],
		})
}

module.exports = {
	// 部署应用包时的基本 URL
	// 默认情况下，Vue CLI 会假设你的应用是被部署在一个域名的根路径上，例如 https://www.my-app.com/
	// 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
	// 这个值也可以被设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径，这样打出来的包可以被部署在任意路径，记得修改路由模式为hash
	publicPath: './',
	// 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
	// 注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)
	outputDir: 'dist',
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
	// 注意： 该目录是相对于 outputDir
	assetsDir: 'static',
	// 指定生成的 index.html 的输出路径 (相对于 outputDir)，也可以是一个绝对路径
	indexPath: 'index.html',
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
	productionSourceMap: false,
	configureWebpack: {
		resolve: {
			alias: {
				'@': resolve('src'),
				'@a': resolve('src/assets'),
				'@v': resolve('src/views'),
				'@c': resolve('src/components'),
				'@api': resolve('src/api')
			}
		}
	},
	chainWebpack: (config) => {
		const types = ["vue-modules", "vue", "normal-modules", "normal"];
		types.forEach((type) =>
			addStyleResource(config.module.rule("less").oneOf(type))
		);
	},
	// 配置连接后台的代理问题
	devServer: {
		// host: '0.0.0.0',
		port: 1111,
		open: false,
		proxy: {
			[process.env.VUE_APP_BASE_API]: {
				target: `http://localhost:3000`,
				// target: `http://211.149.128.130:3000`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: ''
				}
			}
		},
		// disableHostCheck: true
	},
}
