# 访问资源

## 注册用户

登录认证平台，进入创建用户页，系统将默认生成一串随机密码（建议使用），填写用户名后点击提交。

![创建用户](/img/user_details.png)

## 授权并访问资源

访问之前客户端中编写的获取收件箱邮件的接口，浏览器发出的请求将被重定向到 Authmore 认证平台的用户授权页，用户点击 **同意** 按钮后，认证平台将携带生成的 token 返回重定向响应，浏览器会携带此 token 继续访问之前的接口，最终将在浏览器中看到如下数据：

```json
{
  "emails": [
    {
      "from": "James",
      "to": "Tom",
      "content": "Hello, Tom!"
    }, {
      "from": "Tom",
      "to": "James",
      "content": "Hi, James!"
    }, {
      "from": "Tony",
      "to": "James",
      "content": "James, Let's go hiking!"
    }
  ]
}
```