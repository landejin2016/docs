# 创建react项目

> react中文文档： https://react.docschina.org/

## 创建react项目命令：
`npx create-react-app my-app`

执行指令后，会帮你安装 react/react-dom/react-scripts 三个核心包，安装完成后，运行指令启动：

`npm run start`

react会启动在 `3000` 端口

## 目录结构
> app
> > node_modules：装包  
> > public：静态文件  
> > src： 开发目录

src下没有其他文件，只有一堆散乱的文件，所以架构方面需要自己去规划

## Hello World

把src目录下文件全部删除，保留 index.js ，并删除掉多于引入：
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

render函数参数一为需要渲染的内容，参数二为内容写入的容器

## 使用js变量

在jsx中我们使用 {} 包括js变量或表达式

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

let time = new Date();
ReactDOM.render(
  <h1>Hello, world! {time}</h1>,
  document.getElementById('root')
);
```

jsx对象里写注释：
```jsx
const element = <div>
        {/* 注释 */}
    </div>
```