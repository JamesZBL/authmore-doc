# 简介

[Authmore](https://gitee.com/zbl1996/authmore/) 是一个开源的、基于 OAuth2.0 打造的社会化网络下的跨应用认证授权开发套件，它的设计灵感来源于 [Spring Security](https://spring.io/projects/spring-security/)。它由应用管理平台、客户端 SDK 及资源服务端 SDK 组成，主要用于服务端应用的第三方登录、跨应用的用户数据交换时的认证，以及企业内部系统微服务的鉴权。

## 开始使用

::: tip 环境准备
管理平台需要在本机安装 Docker，如果你还没有了解过 Docker，请参考 [Docker 官网](https://docs.docker.com/install/)
:::

Authmore 提供了一个管理平台的 Docker 镜像，鉴于国内网络问题，该镜像目前托管在[阿里云容器镜像平台](https://cr.console.aliyun.com/cn-beijing/instances/images)，现在假设你已经熟悉 Docker 的使用了。

你可以执行这条命令来将 Authmore 管理平台的 Docker 镜像拉取到本地：

```bash
$ docker pull registry.cn-beijing.aliyuncs.com/authmore-ui:latest
```

在 Docker 中运行一个 Authmore 管理平台的容器：

::: tip 端口映射
镜像默认暴露容器的 80 端口，你可以通过 -p 选项指定端口映射的规则
:::
```bash
$ docker run --name authmore-ui registry.cn-beijing.aliyuncs.com/authmore-ui:latest
```

现在假设你已经成功地创建并启动了这个容器，并且容器的 80 端口映射到主机的 8080 端口。