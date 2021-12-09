# pm2 常用命令

1. 进入bin目录启动：`pm2 start www` / `pm2 start app.js`  
2. 
3. `pm2 start app.js --name="fx67ll"` 启动并命名为fx67ll，没有命名的话后续可以用id替代name  
4. `pm2 start app.js --watch` 当文件变化时自动重启应用  
5. `pm2 start script.sh` 启动bash脚本  
6. `pm2 list` 查看所有启动的应用列表  
7. `pm2 monit` 显示每个应用程序的CPU和内存占用情况  
8. `pm2 show [app-id/app-name]` 显示指定应用程序的所有信息  
9. `pm2 log` 显示应用程序的日志信息  
10. `pm2 log [app-id/app-name]` 显示指定应用程序的日志信息  
11. `pm2 flush` 清空所有日志文件  
12. `pm2 stop all` 停止所有应用程序  
13. `pm2 stop [app-id/app-name]` 停止指定应用程序  
14. `pm2 restart all` 重启所有应用程序  
15. `pm2 restart [app-id/app-name]` 重启指定应用程序  
16. `pm2 delete all`  关闭并删除所有应用程序  
17. `pm2 delete [app-id/app-name]` 删除指定的应用程序  
18. `pm2 reset [app-id/app-name]` 重置重启数量  
19. `pm2 startup` 创建开机自启动命令  
20. `pm2 save` 保存当前应用列表  
21. `pm2 resurrect` 重新加载保存的应用列表  
22. `pm2 update` 保存进程，杀死并重启进程  
23. `pm2 generate` 生成一个json配置文件  

#### 关于 cluster mode
1. `pm2 start app.js -i n` 均衡负载模式(cluster mode)启动n个app.js应用实例  
2. `pm2 reload all` 重启均衡负载模式(cluster mode)下的所有应用  
3. `pm2 gracefulReload all` Graceful reload all apps in cluster mode  
4. `pm2 scale [app-id/app-name] 10` 将指定的应用程序拓展到10个实例  

[pm2官方文档](https://pm2.keymetrics.io/docs/usage/quick-start/)  