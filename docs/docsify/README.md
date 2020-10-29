# docsify：基于vue的开源文档生成工具

官方文档： https://docsify.js.org/

---
## 急速上手：

全局安装：
`$ npm i docsify-cli -g`

初始化（生成文档在 ./docs目录）：
`$ docsify init ./docs`

启动本地服务：`$ docsify serve docs`

如果项目只包含文档，没有 `package.json` 时，通过 `npm init -y` 生成默认配置，在script中配置运行命令:

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "serve": "docsify serve docs"
},
```

通过cmd命令: `npm run serve` 即可运行项目

## 项目配置
打开 `index.html` 文件，可以找到这段代码，$docsify是配置文件，你可以在官方网站中找到完整的配置说明
```js
window.$docsify = {
    name: '',
    repo: ''
}
```

---
## loading和文档标题
### loading：
docsify是使用vue构建的，我们可以像处理vue的首屏白屏一样，在 #app 中加入loading的特效，这个效果会在页面进入的时候展示：
```html
<div id="app">
    <!-- loading 会在页面初始化得时候呈现 -->
    <div class="loading">加载中</div>
</div>
```

### name
你可以通过name配置项设置文档的标题，这个标题会显示再侧边栏的顶部，所以需要开启侧边导航栏才会看到：

```js
window.$docsify = {
    name: 'landejin'
}
```
你可以写入标签，自定义标题样式等等

```js
window.$docsify = {
    name: '<p class="title">landejin</p>'
}
```
---
## 导航栏
设置导航栏有两种方式：1、设置标签；2、设置配置文件

### 设置导航标签
```html
<!-- index.html -->

<body>
  <nav>
    <a href="#/">EN</a>
    <a href="#/zh-cn/">中文</a>
  </nav>
  <div id="app"></div>
</body>
```
### 设置配置文件
1. 首先在配置里，开启导航栏：
```js
window.$docsify = {
    loadNavbar: true
}
```
2. 在文档目录下（docs）增加md文件：`_navbar.md`
```markdown
* [导航名称](/)
* [中文](/zh-cn/)
```

3. 当你想使用下拉嵌套时
```markdown
* 语言
    * [中文](/zh-cn/)
```

---
## 侧边栏
先在配置中启用侧边栏
```javascript
window.$docsify = {
    loadSidebar: true
}
```
新建 `_sidebar.md`，内容和导航栏的格式一样
```markdown
* 一级菜单
    * [二级菜单名字](/路径/文件)
```


---
## 启用封面
封面是指，进入文档首页时，显示在顶部的开屏页面，通过配置 `covePage` 以及 `_coverpage.md` 实现

### 打开配置
```javascript
window.$docsify = {
    coverpage: true
}
```

### 增加 _covepage.md文件

```markdown

# docsify <small>3.5</small>

> 一个神奇的文档网站生成器。

- 简单、轻便 (压缩后 ~21kB)
- 无需生成 html 文件
- 众多主题

[GitHub](https://github.com/docsifyjs/docsify/)
[Get Started](#docsify)
```

在默认情况下，封面的颜色时随机的，每次刷新都不一样，你可以设置背景图片或者背景颜色，以代替这种随机颜色
```markdown
<!-- ...忽略其他内容 -->

<!-- 背景图片 -->
![](_media/bg.png)


<!-- 背景色 -->
![color](#f0f0f0)
```

---
## 启用搜索
搜索功能需要通过插件引入和配置才能实现，除了搜索还有其他好用得插件，可以看这里：
` https://docsify.js.org/#/zh-cn/plugins `

### 引入插件js
` <script src="//cdn.jsdelivr.net/npm/docsify/lib/plugins/search.min.js"></script> `

### 启用配置
```javascript
window.$docsify = {
    search: {
        paths: "auto",
        placeholder: '搜索这个文档',
        noData: '没有找到你要得内容',
    }
}
```

简单的常用配置如上，如果你需要更多的配置功能，可以查看插件文档

## 错误页和主题设置

### 错误页
可以自定义404页面，当访问文档链接不存在时，会显示该页面。

在配置文件指定 404 文件的路径：
```JavaScript
window.$docsify = {
    // ...
    notFoundPage: '404.md',
}
```

在文档目录新增404.md，并写入报错信息：
```markdown
# 页面被吃了
```

### 主题设置
通过不同的主题css引入，即可更改文档主题：

```html
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css">
  <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/dolphin.css"> -->
  <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/pure.css"> -->
  <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/dark.css"> -->
  <!-- <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/themes/buble.css"> -->
```

个人觉得还是vue风格比较好看些

---
## 部署到 Github Page

将代码上传至github仓库中，并设置项目 github Page为文档的目录（docs）

`setting -> Github Pages -> Source -> 切换文件夹为docs`