> 参考链接：
> 阮一峰css笔记：http://www.ruanyifeng.com/blog/2017/05/css-variables.html  
> MDN CSS变量教程：https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

> 浏览器支持程度： 
> 主流现代浏览器支持

## 基本使用：

#### 1、定义：
使用 `--` 符号声明一个css变量，变量的值可以为任意数值
```css
:root {
  --main-bg-color: brown;
}
```
> 变量名区分大小写，且拥有作用域，一般css变量全局使用，则放到 :root 中即可

---

#### 2、作用域
```css
:root {
  --color: red;
}

div {
  --color: blue;
}

.box {
    height: 100px;
    width: 100px;
    background-color: var(--color);
}
```

```html
<div class="box"></div>
<p class="box"></p>
```

运行html代码，得到一个蓝色的div和红色的p标签，这是受作用域的影响，和样式的优先级一样，获取变量时拿到的是最精准的作用域下的变量，id > class > 标签 > 全局


**利用作用域，我们可以做这两件常用的操作：**
（1）媒体查询修改变量
```css
@media screen and (max-width: 375px) {
  body {
    --padding: 5px;
  }
}


@media screen and (max-width: 1080px) {
  body {
    --padding: 15px;
  }
}
```


（2）js切换类名更换主题色
```css
.white-theme {
    --bg-color: #fff;
    --color: #333;
}

.black-theme {
    --bg-color: #333;
    --color: #fff;    
}
```

通过js切换类名，即可切换不同的变量，需要注意的是，主题类需要在节点最外层，比如body或者app类上，其次需要用到主题色的地方都要使用变量

---

#### 3、调用变量：
使用 var() 函数和变量名调用变量
```css
.red {
    color: var(--theme-color);
}
```

> 变量只能用做属性值，不能用做属性名

---

#### 4、默认值和向下兼容：
var() 函数可以接受第二个参数，用作找不到变量时的默认值
```css
.red {
    color: var(--theme-color,red);
}

.red {
    color: var(--theme-color, var(--color,red));
}
```

我们无法保证用户使用的设备都支持css变量的特性，所以必要情况下可以进行向下兼容的处理：如果var无效，则使用前一个属性值\

```
.red {
    color: red;
    color: var(--theme-color);
}
```

---

#### 5、js操作变量
（1）检测是否支持css变量
```js
const isSupported =
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--a', 0);

if (isSupported) {
  /* supported */
} else {
  /* not supported */
}
```

（2）操作变量
```js
// 设置
document.body.style.setProperty("--color","red");

// 读取
document.body.style.getPropertyValue("--color");

// 删除
document.body.style.removeProperty("--color");
```

显然，js操作变量需要在 document的环境下，在一些特殊的场合开发就无法发挥作用了，比如uniapp中的多端等。