# pm2 常用命令
**写一篇文章帮助自己记忆整理一下pm2的常用命令**

#### 先说一些废话
之前学习`Nodejs`项目的时候使用了`pm2`作为生产环境的进程管理工具，最近服务器崩了需要重启一些服务，发现有些命令记得不是特别清楚，
所以这里写一篇文章帮助自己记忆整理一下`pm2`的常用命令，后续有需要查阅一下即可~

## 常用命令
1. 进入bin目录启动：`pm2 start www` / `pm2 start app.js`  
2. `pm2 start app.js --name="fx67ll"` 启动并命名为fx67ll，没有命名的话后续可以用id替代name  
3. `pm2 start app.js --watch` 当文件变化时自动重启应用  
4. `pm2 start script.sh` 启动bash脚本  
5. `pm2 list` 查看所有启动的应用列表  
6. `pm2 monit` 显示每个应用程序的CPU和内存占用情况  
7. `pm2 show [app-id/app-name]` 显示指定应用程序的所有信息  
8. `pm2 log` 显示应用程序的日志信息  
9. `pm2 log [app-id/app-name]` 显示指定应用程序的日志信息  
10. `pm2 flush` 清空所有日志文件  
11. `pm2 stop all` 停止所有应用程序  
12. `pm2 stop [app-id/app-name]` 停止指定应用程序  
13. `pm2 restart all` 重启所有应用程序  
14. `pm2 restart [app-id/app-name]` 重启指定应用程序  
15. `pm2 delete all`  关闭并删除所有应用程序  
16. `pm2 delete [app-id/app-name]` 删除指定的应用程序  
17. `pm2 reset [app-id/app-name]` 重置重启数量  
18. `pm2 startup` 创建开机自启动命令  
19. `pm2 save` 保存当前应用列表  
20. `pm2 resurrect` 重新加载保存的应用列表  
21. `pm2 update` 保存进程，杀死并重启进程，一般用于更新pm2版本  
22. `pm2 ecosystem` 生成一个示例json配置文件  
23. *更多命令*可以参考[pm2官方文档](https://pm2.keymetrics.io/docs/usage/quick-start/)  

### 使用均衡负载模式(cluster mode)的相关命令
1. `pm2 start app.js -i n` 均衡负载模式(cluster mode)启动n个app.js应用实例  
2. `pm2 reload all` 重启均衡负载模式(cluster mode)下的所有应用  
3. `pm2 gracefulReload all` Graceful reload all apps in cluster mode  
4. `pm2 scale [app-id/app-name] 10` 将指定的应用程序拓展到10个实例  

### 0秒停机重新加载(集群模式下，可以达到重启时不停止服务)
1. `pm2 reload app.js`  重新启动所有进程，始终保持至少一个进程在运行
2. `pm2 gracefulReload all`  优雅地以集群模式重新加载所有应用程序


## pm2配置文件
### 生成示例配置文件
```
// 生成一个示例json配置文件
pm2 ecosystem
// pm2初始化
pm2 init
```

### 配置项
1. 基础类
	+ `name`：进程名  
	+ `script`：node启动文件的路径  
	+ `cwd` ：项目所在的目录  
	+ `args` ：通过命令行传递给node启动文件的参数  
	+ `interpreter` ：编译器的绝对路径（默认node）  
	+ `interpreter_args` ：传给编译器的参数  
	+ `node_args`：传给node的参数  
2. 进阶类
	+ `instances` ：进程数  
	+ `exec_mode` ：进程的模式（cluster或fork）  
	+ *PS:* cluster模式利用node的child_process模块孵化多个子进程，主进程监听端口，子进程只和主进程通信，从而达到单个端口多个进程；通过轮转方式实现负载均衡  
	+ `watch` ：布尔值或文件数组，允许开启监听文件改动重启  
	+ `ignore_watch` ：不监听的文件  
	+ `max_memory_restart` ：超过该内存就自动重启  
	+ `env` ：应用中的默认环境变量  
	+ `env_` ：命令行中可传入的环境变量，覆盖默认环境变量  
	+ `source_map_support` ：默认true，支持sourcemap文件  
3. 日志类
	+ `log_date_format` ：日志时间格式
	+ `error_file` ：错误日志存放路径
	+ `out_file` ：全部日志存放路径
	+ `combine_logs`：是否将不同id的进程日志合并
	+ `merge_logs`：同上
4. 控制流
	+ `min_uptime` ：pm2认为进程在线的最小时长  
	+ `listen_timeout` ：如果app没有发送ready信号，间隔多长时间reload  
	+ `kill_timeout` ：从告诉进程要关闭到强制关闭进程的间隔时间  
	+ `wait_ready`：是否等待进程发送ready信号  
	+ `max_restarts` ：最大不稳定重启次数（不稳定指的是小于1s或者小于的`min_uptime`重启）  
	+ `restart_delay`：进程掉线后，等待多长时间重启  
	+ `autorestart`： 是否开启自动重启  
#### 配置项实践中需要注意的内容
1. `script`：若使用cluster模式，必须是启动文件入口，不可通过npm启动  
2. `max_restarts`：指不稳定重启，即小于1s或`min_uptime`的重启，要结合`min_uptime`配置才起效  
3. `listen_timeout`：当cluster模式时，这个值要大于一个进程启动所需时间，否则reload时会造成短暂的服务不可用  

### 配置文件示例
```
module.exports = {
    apps : [{
        name      : 'API',      //应用名
        script    : 'app.js',   //应用文件位置
        env: {
            PM2_SERVE_PATH: ".",    //静态服务路径
            PM2_SERVE_PORT: 8080,   //静态服务器访问端口
            NODE_ENV: 'development' //启动默认模式
        },
        env_production : {
            NODE_ENV: 'production'  //使用production模式 pm2 start ecosystem.config.js --env production
        },
        instances:"max",          //将应用程序分布在所有CPU核心上,可以是整数或负数
        watch:true,               //监听模式
        output: './out.log',      //指定日志标准输出文件及位置
        error: './error.log',     //错误输出日志文件及位置，pm2 install pm2-logrotate进行日志文件拆分
        merge_logs: true,         //集群情况下，可以合并日志
        log_type:"json",          //日志类型
        log_date_format: "DD-MM-YYYY",  //日志日期记录格式
    }],
    deploy : {
        production : {
            user : 'node',                      //ssh 用户
            host : '212.83.163.1',              //ssh 地址
            ref  : 'origin/master',             //GIT远程/分支
            repo : 'git@github.com:repo.git',   //git地址
            path : '/var/www/production',       //服务器文件路径
            post-deploy : 'npm install && pm2 reload ecosystem.config.js --env production'  //部署后的动作
        }
    }
};
```

### 配置启动命令（package.json）
```
# pm2-server工程的环境变量，目的是区分各个环境的应用启动路径
# cross-env NODE_ENV=development

# pm2的启动命令
# pm2 start pm2-conf/ecosystem.config.js

# 传递给pm2的参数，-- only  <name>，--env <env name>
# --only  detective  --env test

cross-env NODE_ENV=development   pm2 start pm2-conf/ecosystem.config.js   --only  detective  --env test
```


## 关于pm2
### pm2是什么
pm2（Process Manager 2）是具有内置负载均衡器的Node.js应用程序的生产运行时和进程管理器。
它允许您永久保持应用程序活跃，无需停机即可重新加载它们，并促进常见的Devops任务。

### pm2特性
1. 后台运行：普通启动方式：`node index.js`关闭终端就结束进程，`pm2`可以后台运行，终端关闭不影响  
2. 日志管理：应用程序日志保存在服务器的硬盘中`~/.pm2/logs/`  
3. 负载均衡：`pm2`可以通过创建共享同一服务器端口的多个子进程来扩展您的应用程序，这样做还允许您以零秒停机时间重新启动应用程序  
4. 终端监控：提供实时的接口，可以在终端中监控您的应用程序并检查应用程序运行状况（CPU使用率，使用的内存，请求/分钟等）  
5. SSH部署：自动部署，避免逐个在所有服务器中进行`ssh`  
6. 静态服务：支持静态服务器功能  
7. 多平台支持：适用于`Linux`（稳定）和`macOS`（稳定）和`Windows`（稳定）  
8. 集成管理：对于多个进程，不同环境，可以统一配置，方便管理  

### pm2安装
使用npm命令`npm install pm2`即可，配置项参考npm的方式


## 附录
### 参考资料
1. [参考教程 ———— pm2 官方教程](https://pm2.keymetrics.io/docs/usage/quick-start/)  
2. [参考文档 ———— PM2 常用命令](https://www.jianshu.com/p/9cab8f7020c1)  
3. [参考文档 ———— pm2介绍及使用手册](https://blog.csdn.net/cs380637384/article/details/82682799)  
4. [参考文档 ———— pm2入坑详解](https://www.jianshu.com/p/1778deeb428e)  


我是 [fx67ll.com](https://fx67ll.com)，如果您发现本文有什么错误，欢迎在评论区讨论指正，感谢您的阅读！  
如果您喜欢这篇文章，欢迎访问我的 [本文github仓库地址](https://github.com/fx67ll/fx67llNode/blob/main/node-note/pm2.md)，为我点一颗Star，Thanks~ :)  
***转发请注明参考文章地址，非常感谢！！！***