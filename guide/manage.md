# 认证平台

## 用户登录

::: tip 用户密码
鉴于安全原因，root 用户的默认密码会在容器启动时随机生成并打印在控制台中，当然你也可以在登录后创建新的管理员用户。
这个设计的灵感来自于 [Jenkins](https://jenkins.io/)，它是目前最流行的的持续集成工具之一。
:::

从容器的启动日志中获取 root 用户的密码，它可能是这样的：

```bash
Authmore root password: eVzhBfnWb7djJH47THwOZ06EWiUzw1kV
```

访问本地的 8080 端口进入平台登录页面：

![](/img/signin.png)

使用 root 用户以及刚刚获取的密码登录：

![](/img/home.png)