# 创建资源服务

**资源服务**即 OAuth 协议中的受保护数据的提供者，在此例中，这个提供者就是**邮箱**应用。

## 在平台上注册

在平台上创建一个名为**邮箱**的应用，创建这个作用是资源服务需要向认证平台发送请求来校验客户端携带的 token，这个校验过程也是需要校验权限的，所以采用客户端密钥模式（Client Credentials），最终将同样得到一个 AppSecret 和一个 AppSecret。

![](/resource_details.png)

## 创建项目

和创建客户端应用类似，创建一个基于 `Spring Boot` 的 Gradle 项目，在 `build.gradle` 文件中加入如下依赖：

```groovy
implementation 'com.github.jameszbl:authmore-resource-springboot-starter:1.0-RC'
```

最终的该文件的完整内容为：
```groovy
plugins {
    id 'java'
    id 'org.springframework.boot' version '2.1.3.RELEASE'
}

apply plugin: 'io.spring.dependency-management'

group = 'com.github.jameszbl'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '1.8'

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    # Authmore 的资源服务端 SDK
    implementation 'com.github.jameszbl:authmore-resource-springboot-starter:1.0-RC'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
``` 

## 编写配置

::: tip token 校验
Authmore 的认证平台 token 校验端口 url 为 `/oauth/check_token`
:::

邮箱应用的**资源ID**采用之前的设计，即`MAILBOX`, 所以在 `application.yml` 文件中添加如下配置：

```yaml
server:
  port: 8091

authmore:
  resource:
    resource-id: MAILBOX
    token-info-url: http://localhost:8080/oauth/check_token
    client-id: 5cb88433ee173c60c379e04f
    client-secret: 6LJTlUAfSo4TZhgRdAh2BC1hfUGROEpT
```

## 编写资源接口

在此项目中我们复用服务端创建的数据传输对象类，即 `Email` 和 `Inbox`，下面编写用于获取收件箱资源的接口，使用模拟的邮件数据：

```java
@RestController
public class InboxResourceEndpoint {

  @GetMapping("/inbox")
  @ScopeRequired("EMAIL")
  @AuthorityRequired("READ")
  public Inbox inbox() {
    new Inbox(Arrays.asList(
      new Email().setFrom("James").setTo("Tom").setContent("Hello, Tom!"),
      new Email().setFrom("Tom").setTo("James").setContent("Hi, James!"),
      new Email().setFrom("Tony").setTo("James").setContent("James, Let's go hiking!")));
    return new Inbox(Collections.emptyList());
  }
}
```
