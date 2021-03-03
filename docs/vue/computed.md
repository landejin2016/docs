# 计算属性

> 计算属性是一种可以实现动态更新数据的属性，计算属性会监听依赖的内容，如果内容发生变化时，会自动更新属性值

## 简单的实列代码片段

```js
computed: {
  value() {
    return this.name + " " + this.time
  }
}
```

👆👆👆
我们定义了一个计算属性value，value依赖于data中name和time，当这两个值只要有一个发生了变化，value便会重新得到数据

```html
<div>
  {{value}}
</div>
```

👆👆👆
计算属性的调用很简单，和data差不多，不同的是，data可以被随意修改，而简单computed不能被直接修改，只能通过修改计算属性的依赖，从而修改计算属性的结果，如下：

```js
created() {
  this.value = "my value"; // ❌
  this.name = "my"; // ✔
}
```

## 可修改的计算属性

首先我们要了解为什么计算属性不能被直接修改，很简单，计算属性最终的结果是依赖不同的变量计算而来，如果修改了计算属性的值，程序并不知道怎么处理，如果修改了计算属性，那当计算属性依赖的值发生变化时，
程序应该怎么处理呢？所以一般的计算属性是不允许被修改的

当我们了解不能被修改的原理后，很容易想到，如果我告诉程序，被直接修改时怎么处理，是不是就可以实现直接修改了？是的，这种方式在vue中有被实现，我们需要改写一下计算属性的结果

```js
computed: {
  value: {
    get() {
      return this.name + " " + this.time
    },
    set(val) {
      this.name = this.val.split(" ")[0];
      this.time = this.val.split(" ")[1];
    }
  }
}
```

👆👆👆
上面是我们改造后的计算属性，熟悉面向对象开发的同学肯定不陌生，get是计算属性得到的结果，set是计算属性被直接设置时的处理逻辑

## 注意

计算属性里依赖的数据要是响应式的，在依赖一些深度的对象时，容易忽略这一点，导致计算属性没有生效，举过例子

```js
export default {
  name: 'HelloWorld',
  data() {
    return {
      params: {
        page: 1
      }
    }
  },
  created() {
    setTimeout(() => {
      this.params.name = "苹果";
      console.log("已被修改")
    }, 5000);
  },
  computed: {
    current() {
      return `${this.params.page} --- ${this.params.name}` 
    }
  }
}
```

👆👆👆
计算属性 current 依赖于 this.params.page 和 this.params.name 两个值，然而 this.params.name 一开始并不存在，而是在5秒后动态赋值到params中的，vue中这样的写法并不是响应式的，
所以计算属性也不会更新，详细可以移步官方文档：

> vue深入响应式原理： https://cn.vuejs.org/v2/guide/reactivity.html
