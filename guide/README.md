# 开始使用

[Authmore](https://gitee.com/zbl1996/authmore/) 是一个开源的、基于 OAuth2.0 打造的社会化网络下的跨应用认证授权开发套件，它的设计灵感来源于 [Spring Security](https://spring.io/projects/spring-security/)。它由应用认证平台、客户端 SDK 及资源服务端 SDK 组成，主要用于服务端应用的第三方登录、跨应用的用户数据交换时的认证，以及企业内部系统微服务的鉴权。

## 安装

::: tip 环境准备
认证平台需要在本机安装 Docker，如果你还没有了解过 Docker，请参考 [Docker 官网](https://docs.docker.com/install/)
:::

Authmore 提供了一个认证平台的 Docker 镜像，该镜像目前托管在[Docker Hub](https://hub.docker.com)，现在假设你已经熟悉 Docker 的使用了。

你可以执行这条命令来将 Authmore 授权服务的 Docker 镜像拉取到本地：

```bash
docker pull jameszbl/authmore-platform:latest
```

另外 Authmore 提供了一套前后端分离的 Web 应用，用来对平台的客户端注册和用户数据进行管理，它们同样以 Docker 镜像打包好了，可以直接部署。

::: tip 外部依赖
Authmore 需要依托 MongoDB 和 Redis，因此推荐使用 docker-stack 或 docker-compose 来部署这套开放平台
:::

下面是 compose file：

```yaml
version: "3"

services:
  platform:
    image: jameszbl/authmore-platform
    restart: unless-stopped
    networks:
      - authmore
    ports:
      - "8086:8086"
    depends_on:
      - mongo
      - redis

  admin:
    image: jameszbl/authmore-admin
    restart: unless-stopped
    networks:
      - authmore
    ports:
      - "8083:8083"
    depends_on:
      - mongo
      - redis

  authmore-ui:
    image: jameszbl/authmore-ui
    restart: unless-stopped
    networks:
      - authmore
    ports:
      - "3002:80"
    depends_on:
      - admin

  redis:
    image: redis
    restart: unless-stopped
    networks:
      - authmore
    volumes:
      - redis-data:/data

  mongo:
    image: mongo
    restart: unless-stopped
    networks:
      - authmore
    volumes:
      - mongo-data:/data/db
      - mongo-config:/data/configdb

networks:
  authmore:

volumes:
  mongo-data:
  mongo-config:
  redis-data:
```

现在假设你已经成功地创建并启动了这几个容器，并且容器的端口映射都正确工作了。
