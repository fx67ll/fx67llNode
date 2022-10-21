# 解决使用`npm install`或`npm i`命令之后报`Unexpected token in JSON at position`错误的问题  

### 网上大多数的教程都是以下几个步骤挨个试一遍，包括`stackoverflow`上也是这么说的  
1. 删除`node_modules`文件夹  
2. 删除`package-lock.json`文件  
3. 强制清除npm缓存 `npm cache verify`，如果还不行就使用强力清除 `npm cache clean --force`  
4. 修改npm源地址为官方源或者淘宝源 *（坑就在这里！先别往下看，思考一下为什么这里有坑？）*
```
`npm config set registry http://www.npmjs.org/`  
`npm config set registry http://registry.npm.taobao.org`  
```
5. 上述四步都完成了之后，执行`npm install`或`npm i`命令理论上来说就没有问题了，当然需要排除网络问题或者node自身的问题  

### 上面的第四步为什么有问题
新的npm地址已经改为 *https://registry.npmjs.org/*，网上大多数教程还写着 ~~https://www.npmjs.org/~~，所以如果你走了上面的第四步，
并选择使用官方源地址，那么，你会百思不得其解，究竟是为什么还在报错？甚至怀疑人生！！！

### 这个问题带来的思考
通过网上的博文来找到解决问题的思路没问题，但是一定要带着怀疑的态度思考，确定是否合理。在这个问题中，我下意识的认为博文中的官方地址一定是对的，
一定是我的问题，所以才会百思不得其解，究竟是哪里出了问题，大概这就是灯下黑吧。在今后处理问题的过程中，一定要保持怀疑的态度思考  


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llNode/blob/main/node-blog/npm-install-error.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***