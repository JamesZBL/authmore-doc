# 创建客户端

OAuth2.0 协议中包含了四种基本的认证模式，即授权码模式（Authorization Code）、密码模式（Password）、客户端凭证模式（Client Credentials）和简化模式（Implicit）。其中，授权码模式是数据交换步骤最多的，同时也是最安全的，最适合开放平台及第三方的认证授权方案。
这里的应用及具备访问认证平台下某个资源服务的客户端。

## 在平台上注册

现在我们以授权码模式为例，创建一个**邮件阅读器**应用，它在 OAuth 协议中以客户端的身份存在，是用户数据的访问者，也就是认证和授权的主要对象。
邮件应用作为**客户端**访问作为**资源服务**的**邮箱**应用中的数据，阅读器用户就需要使用邮箱应用的身份凭证为阅读器应用授权，只有用户明确允许阅读器应用访问该用户的邮箱内容时，这个读访问是合法的。Authmore 所做的正是如何保证邮箱应用中的数据总是合法地被访问：认证平台在得到用户的确认后为阅读器应用颁发凭证，邮箱服务通过 Web API 和认证平台进行通信，来验证阅读器所提供凭证的有效性，最终决定是否对访问给予许可。

进入**创建应用**页，输入“邮件阅读器”，进入下一步，填写应用的详情。该应用作为第三方应用的身份，将对平台下的资源服务“邮箱”进行数据访问，**邮箱**资源的**资源ID**设计为`MAILBOX`，并且限制其访问权限为 `READ`；它仅被允许访问用户资料以及收件箱中的邮件这两部分数据，所以限制其访问范围为`PROFILE` 及 `EMAIL`。

**应用名称**
![应用名称](/img/client_name.png)
**应用详情**
![应用详情](/img/client_details.png)

点击提交后，将生成唯一的 AppID 及 AppSecret（私钥）：

![应用详情](/img/client_result.png)

::: tip 私钥
为安全起见，私钥只限该应用的服务端在获取 token 时使用，且需妥善保存，一定不要下发到客户端（终端）应用，
:::

## 创建项目

使用 Maven 或 **Gradle (推荐)** 创建一个 **Spring Boot** 项目，如果你对它还不了解，请参考 [Spring Boot 官方文档](https://spring.io/projects/spring-boot) Gradle 为例，创建完成后在 `build.gradle` 文件中的 dependencies 块中引入 Authmore 的客户端 SDK 的依赖，最终完整内容：

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
    # Authmore 的客户端 SDK
    implementation 'com.github.jameszbl:authmore-client-springboot-starter:1.0-RC'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```

进入 `src/main/resources` 目录，我们使用 `yml` 格式的配置文件，如果创建好的项目中出现的配置文件是 `application.properties`，可以直接将后缀改为 `.yml`。

## 编写配置

::: tip 接口
Authmore 认证平台的 token 签发端口的 uri 为 `/oauth/token`，用户的页面授权端口 uri 为 `/authorize`
:::

修改 `application.yml` 文件的内容为：

```yaml
server:
  port: 8090

authmore:
  client:
    client-id: 5cb7e7bcee173c60c379e04e
    client-secret: afLTqlcRUr32UC3nWiUNIMsfOmVlzuzX
    token-issue-url: http://localhost:8080/oauth/token
    authorize-url: http://localhost:8080/authorize
    redirect-uri: http://localhost:8090/inbox
```

其中的 `client-id` 及 `client-secret` 是刚才在平台注册应用时获取的， `token-issue-url` 为平台的 token 签发端口，`redirect-uri` 为用户授权后携带授权码重定向到客户端的接口，这里设置为收件箱页面的接口，也就是稍候我们将要在这个项目中编写的接口，这个邮件阅读器**客户端**将访问邮件**服务**的**用户资料**及**邮件**两部分数据。

首先用类定义数据传输格式：

```java
/**
 * 邮件
 */
public class Email {

    private String subject;
    private String from;
    private String to;
    private String content;

    // setters & getters ...
}

/**
 * 收件箱
 */
public class Inbox {

    private List<Email> emails;

    public Inbox(List<Email> emails) {
        this.emails = emails;
    }

    // setters & getters ...
}
```

## 授权引导与令牌请求

编写一个获取收件箱中邮件的接口 `/inbox`，接口将返回 `JSON` 格式的数据：

```java
@RestController
public class InboxEndpoint {

    private AuthorizationCodeTokenManager tokenManager;
    private AuthorizationTemplate authorizationTemplate;

    /** 授权作用域 **/
    private static final String SCOPES = "PROFILE,EMAIL";

    @Autowired
    public InboxEndpoint(
            AuthorizationCodeTokenManager tokenManager,
            AuthorizationTemplate authorizationTemplate) {
        this.tokenManager = tokenManager;
        this.authorizationTemplate = authorizationTemplate;
    }

    @GetMapping("/inbox")
    public Object inbox(
            @RequestParam(value = "code", required = false) String code,
            HttpServletResponse response) throws IOException {

        /** 首先将用户的请求重定向到认证平台，引导用户授权 **/
        if (StringUtils.isEmpty(code)) {
            authorizationTemplate.redirectToUserAuthorize(
                    response, OAuthProperties.ResponseTypes.CODE, SCOPES);
            return null;
        }

        /** 构造请求参数 **/
        Map<String, String> params = new HashMap<>();

        /** 认证平台重定向回此接口时所携带的授权码 **/
        params.put("code", code);

        /** 携带授权码获取 token **/
        TokenResponse token = tokenManager.getToken(SCOPES, params);

        /** 获取收件箱中的邮件 **/
        ClientRestTemplate restTemplate =
                new ClientRestTemplate(token.getAccess_token());
        return restTemplate.getForObject("http://localhost:8091", Inbox.class);
    }
}
```