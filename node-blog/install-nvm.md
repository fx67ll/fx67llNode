# 使用nvm安装以及管理多版本node教程

### 安装nvm、node、npm
1. 下载nvm安装包，推荐使用1.1.7，我个人使用1.1.8会有中文乱码的报错   
2. 点击exe文件，注意修改nvm的安装根目录以及node的安装根目录，后者是以后管理多版本node的源文件储存地址  
3. 打开系统cmd，依次输入一下目录
	+ `nvm -version` 检查nvm是否安装成功  
	+ `nvm install (你需要安装的node版本号)` 可以去官网查看 [以往版本列表](https://nodejs.org/zh-cn/download/releases/)  
	+ 注意！！！上一步会直接同时安装相对应版本npm  
	+ `nvm use (你需要安装的node版本号)` 一般还会弹出系统权限使用框，一定要点通过  
	+ `node -v` 检查node是否安装成功  
	+ `npm -v` 检查npm是否安装成功  

#### 两个版本号都可以出来了，说明nvm管理node版本就已经成功了  


### 使用nvm管理node版本
1. 一般需要安装什么版本安装多少node都可以，可以通过 [官网来查看所有node的历史版本](https://nodejs.org/zh-cn/download/releases/)  
2. 使用`nvm list`，可查看当前所有已安装的node版本，版本号前带`*`的表示当前正在使用的node版本  
3. 如果需要删除什么版本的ndoe，可以使用命令`nvm uninstall (你需要删除的node版本号)*`即可  


### 使用shell命令切换npm源
+ 设置官方npm源
```
npm config set registry http://registry.npmjs.org/
```
+ 查看当前使用的npm源地址
```
npm get registry
```


### 使用nrm查看和切换镜像
1. 使用npm全局安装 `npm install -g nrm`  
2. 查看源列表 `nrm ls`  
```
npm ---------- https://registry.npmjs.org/
yarn --------- https://registry.yarnpkg.com/
tencent ------ https://mirrors.cloud.tencent.com/npm/
cnpm --------- https://r.cnpmjs.org/
taobao ------- https://registry.npmmirror.com/
npmMirror ---- https://skimdb.npmjs.com/registry/
```
3. 切换源列表 `nrm use (你需要使用的源名称)`  


## 需要注意新的npm地址已经改为 *https://registry.npmjs.org/*，网上大多数教程还写着 ~~https://www.npmjs.org/~~，切勿入坑！！！切记！！！切记！！！切记！！！


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llNode/blob/main/node-blog/install-nvm.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***