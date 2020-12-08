# nodemailer发送邮件

> nodemailer 文档： https://nodemailer.com/about/

## 安装
`npm install nodemailer -S`

## 基础示例
我们可以把发送邮件封装成一个函数，方便调用：

```javascript
// 引入依赖
const nodemailer = require("nodemailer");

// 导出函数，参数：接受邮件的邮箱；邮件的内容；邮件的标题；...
module.exports = function sendEmail(email,content,title = "验证码") {
    
    // 创建发送方的邮箱对象
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465,
        // host、端口号根据邮箱类型而定，可以在 node_modules\nodemailer\lib\well-known\services.json中查找
        secure: true, // 端口号为465时true，其他为false
        auth: {
            user: "1294619453@qq.com", // 发送方邮箱地址(自己或企业的邮箱账号)
            pass: "xxxxxx", // smtp 验证码，私密的凭证，后面有获取的方式
        }
    });

    // 发送邮件的内容
    let info = {
        from: '"六月迎风" <1294619453@qq.com>', // 邮件来源地址
        to: email, // 发送到的邮箱，多个邮箱用,分割
        subject: title, // 邮件主题
        text: content, // 邮件的内容
        // html: ... // 可以发送html的邮件
    }

    // 发送邮件是个异步过程，这里把Promise return回去
    return transporter.sendMail(info);
}
```

## !!!着重说明
- 发送方的host和port依据邮箱类型而定，在node_modules\nodemailer\lib\well-known\services.json中可以查找到
- 要通过代码发送邮件，邮箱账户必须开启 smtp 服务，拿到密钥才能发送
- smtp密钥非常重要，一般不直接写在代码上，而是通过配置或其他安全性更高的方法存储，smtp千万不能外露
- sendMail是异步的过程

## 开通 smtp服务
登录邮箱的后台 -> 账户设置 -> POP3/IMAP/SMTP... -> 点击开启SMTP服务 -> 生成授权码

拿到的授权码对应就是 auth 中的 pass