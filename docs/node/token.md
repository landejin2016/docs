# token校验

token是客户端和服务端进行通信的一种凭证。

## token认证流程：
1. 客户端进行登录请求
2. 服务端接受到账号密码，验证是否登录成功
3. 如果登录成功，通过服务器密钥 + 客户端的一些信息（token有效时间、用户id等）进行加密，并返回给客户端
4. 客户端接受到token加密串，并进行长期保存
5. 客户端每次请求时，都带上token（通常存在header中）
6. 服务端在需要登录权限才能访问接口时，对token进行解密，如果解密成功，并且没有过期则可以通过校验

因为token加密的密钥，别人并不知道，所以没办法使用假的token，除非是token被盗用，或服务器密钥泄露

## node的token生成和验证

**安装**
`npm i jsonwebtoken -S`

**生成服务端密钥**
`ssh-keygen -t rsa -b 2048 -f private.key`

**token加密方式**
jwt加密时，通常有两种加密形式：
`RS256 非对称加密`
`HS256 对称加密`

两者区别在于：
RS256使用私钥加密，用公钥解密，适用于不同的服务间的鉴权
HS256使用私钥加密，也用私钥解密，当你的应用只有一个服务时，使用简单的HS256即可

HS256生成的token比RS256要短很多，而且不需要生成公钥，比较简单

**生成公钥**
> 当你使用RS256加密时，需要通过第三方软件生成公钥
> 生成公钥需要用到openssl，你可以在这里进行下载： https://oomake.com/download/openssl
> 下载安装后，把安装路径中的bin目录，添加到环境变量中，才可以使用openssl 命令

`openssl rsa -in private.key -pubout -outform PEM -out public.key`

**生成和验证HS256的token**
```javascript
const fs = require("fs");
const path = require("path");

// 通过私钥进行加密
function createToken(decoded) {
    decoded.exp = Date.now() + 60 * 60 * 1000;
    return jwt.sign(decoded, fs.readFileSync(path.resolve(__dirname, "../private.key")), { algorithm: 'HS256' });
}

// 通过私钥进行解密
function verifyToken(token) {
    return new Promise(resolve => {
        jwt.verify(token, fs.readFileSync(path.resolve(__dirname, "../private.key")), { algorithm: 'HS256' }, function (err, decoded) {
            if (err) {
                return resolve();
            }
            resolve(decoded);
        });
    })
}
```

**生成和验证RS256的token**
```javascript
const fs = require("fs");
const path = require("path");

// 通过私钥进行加密
function createToken(decoded) {
    decoded.exp = Date.now() + 60 * 60 * 1000;
    return jwt.sign(decoded, fs.readFileSync(path.resolve(__dirname, "../private.key")), { algorithm: 'RS256' });
}

// 通过公钥进行解密
function verifyToken(token) {
    return new Promise(resolve => {
        jwt.verify(token, fs.readFileSync(path.resolve(__dirname, "../public.key")), { algorithm: 'RS256' }, function (err, decoded) {
            if (err) {
                return resolve();
            }
            resolve(decoded);
        });
    })
}
```