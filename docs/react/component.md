# react组件

## 函数式组件
```js
function Tabs() {
    return <div>
            <div>组件</div>
        </div>
}
```

组件名需要大写开头，return需要渲染的内容，内容只能有一个根节点。

## 类组件

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

class Tabs extends React.Component{
    render() {
       return <div>
            <div>组件</div>
        </div> 
    }
}
```

类名需要大写开头，实现reader函数，并在函数里return需要渲染的节点内容，根节点同样唯一

## 调用组件
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Tabs />
  document.getElementById('root')
);
```

## 组件参数

调用时传参：
```javascript
ReactDOM.render(
  <Tabs current="1"/>
  document.getElementById('root')
);
```

定义组件时接受参数：

> 函数式组件，需要定义形参
```js
function Tabs(props) {
    return <div>
            <div>{props.current}</div>
        </div>
}
```

> 类组件，直接通过this.props可以获取所有参数
```js
class Tabs extends React.Component{
    render() {
       return <div>
            <div>{this.props.current}</div>
        </div> 
    }
}
```

## 状态（data）