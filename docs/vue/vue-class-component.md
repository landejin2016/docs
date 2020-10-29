# vue-class-component

当你使用vue-cli进行下项目构建时，如果选择了通过class的方式进行项目开发，那官方为你安装的就是 `vue-class-component` 插件


> 插件文档地址：`https://class-component.vuejs.org/`

> Typescript中文文档教程（超棒）：https://www.tslang.cn/index.html

## 基本使用
**导入装饰器和vue对象**

```javascript
/* 注意lang为ts */
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
</script>
```

**通过装饰器和vue定义组件类**
```javascript
@Component
export default class Home extends Vue {
    message = '数据';
}
```

**vue的属性实现**

1. data
类中的成员变量就是data的数据
```javascript
@Component
export default class Home extends Vue {
    message = '数据'; // 相当于 data() {return {message: '数据'}}
}
```

2. methods
类成员方法就是methods中的函数（注意，methods的函数不能和声明周期函数名字冲突，否则被当成生命周期处理）
```javascript
@Component
export default class Home extends Vue {
    add() {
        // ...
    }
}
```
```javascript
//相当于:
// ...
methods: {
    add() {
       // ...
    }
}
// ...
```

3. 计算属性
类中的get和set变量分别表示计算属性的get和set方法
```javascript
@Component
export default class Home extends Vue {
    get name() {
        return '张三';
    }
    set name(val) {
        // ...
    }
}
```
```javascript
//相当于:
// ...
computed: {
    name: {
        get() {
            return '张三';
        }
        set(val) {
        // ...
        }
    }
}
// ...
```

4.声明周期
和methods一样，在类成员方法中，定义的方法名字如果与生命周期的名字相同，则被视为声明周期

5.引入组件和声明组件名称
当你想局部引入组件或声明当前组件的名称时，可以在component装饰中声明：
```javascript
import Navbar from '@/components/navbar.vue'

@Component({
    name: 'Home', // 当前组件名称
    components: {
        Navbar // 局部组件
    }
})
export default class Home extends Vue {
    // ...
}
```
```javascript
//相当于:
// ...
import Navbar from '@/components/navbar.vue'
// ...
name: 'Home',
components: {
    Navbar
}
// ...
```
6.其他选项
watch、filter等属性都在装饰器里进行声明：

```javascript
@Component({
    watch: {
        '$route'(val) {
        
        }
    }
})
export default class Home extends Vue {
    // ...
}
```

7.组件props属性
props只有在组件封装的时候使用，它的用法在vue-class-component和其他属性有区别，需要通过继承来实现：
```javascript
const GreetingProps = Vue.extend({
  props: {
    name: String
  }
})

@Component
export default class Greeting extends GreetingProps {
    // ...
}
```

## 常见疑难点
**1.typescript引入node_modules包，提示不存在：**

答：这是因为很多插件库，只支持js，所以在typescript中引入报错了，只要在npm上搜索改插件的type支持包即可，通常包名为 `@types/xxx`

**2.定义了全局变量 `Vue.prototype.$xxx`，在页面中却提示`this.$xxx` 不存在**

答：通过 `Vue.prototype` 定义的全局变量，并不能自动在Vue的Interface增加，所以需要自己拓展 vue 的 Interface 才能检测到该变量，具体方法如下：

（1）在src目录下定义 `vue-prototype.d.ts` 文件，并拓展vue的Interfa：

```javascript
import { Config } from '@/interface/index'; // Config是自定义的Interface
declare module "vue/types/vue" {
    interface Vue {
        $utils: Config,
        $verify: Config,
    }
}
```

**3.typescript定义变量为 object类型，却不能访问该变量的属性**

答：object类型在typescript中的含义并不是表示 `{name: ''}` 这样的对象，而是表示：`非原始类型，即除了number，string，boolean，symbol，null或undefined之外的值`

所以定义为object类型，并不能访问任何属性，因为它可能是Object、Array、Date等等一切非原始类型。

正确的做法是：定义 Config 接口，接口如下：
```js
export interface Config {
    [key: string]: any;
}
```
这表示了类似 `{name: ''}`这样的键值对结构，key定义为字符串，而value为任意值any

Config在需要的时候通过import引入，因为是全局都可能用到，自定义接口应该单独放到文件夹中：
```
src 
    |- config
        |- index.ts
```