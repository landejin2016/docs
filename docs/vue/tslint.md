# tslint 配置

```javascript
{
  "defaultSeverity": "warning",
  "extends": [
    "tslint:recommended"
  ],
  "linterOptions": {
    "exclude": [
      "node_modules/**"
    ]
  },
  "rules": {
    "indent": [true, "spaces", 2], // 缩进采用两个空格
    "no-consecutive-blank-lines": [true,2], // 不允许连续超过两个空格出现
    "object-literal-sort-keys": false, // 不强制对象的key按字母排序
    "ordered-imports": false, // 不强制导入的内容按字母排序，允许只导入不接收
    "quotemark": [true, "single"], // 使用单引号
    "trailing-comma": false, // 对象和数组后面不加分号
    "only-arrow-functions": true, // 禁止使用非箭头函数
    "await-promise": true, // 禁止 await一个非异步的值
    "curly": true, // 条件语句必须使用大括号
    "no-async-without-await": true, // async函数必须有await或return
    "no-bitwise": true, // 禁止使用二进制运算符
    "no-duplicate-super": true, // 直接在子类中声明两次 super
    "no-duplicate-variable": true, // 禁止重复声明变量
    "no-empty": true, // 禁止空块 {}
    "no-eval": true, // 禁止使用eval函数
    "no-invalid-template-strings": true, // 禁止非字符串模板使用${
    "no-invalid-this": true, // 禁止在class之外调用this
    "no-return-await": true, // 禁止用不到的return语句
    "no-shadowed-variable": true, // 禁止在局部作用域内定义与外层作用域相同的变量名
    "no-string-literal": true, // 禁止 obj['name']的发生
    "no-unsafe-finally": true, // 禁止return、break等语句放到执行死块后面
    "no-use-before-declare": true, // 禁止变量声明前就被使用
    "no-var-keyword": true, // 禁止使用var
    "restrict-plus-operands": true, // 只用数字和字符串能使用 + 
    "switch-default": true, // switch必须使用default
    "triple-equals": true, // 使用全等
    "unnecessary-constructor": true, //禁止空白的构造函数
    "use-default-type-parameter": true, // 禁止变量初始化为该变量类型的默认值
    "use-isnan": true,// 禁止使用 n === NaN，强制使用 isNaN(n)
    "arrow-return-shorthand": true, // 函数只包含return的值时，省略大括号和return关键字
    "class-name": true, // 强制类名使用驼峰式
    "comment-format": [true,"check-space"],// 强制单行第一位为空格 // 注释
    "encoding": true, // 使用utf8格式文件
    "no-boolean-literal-compare": true, // 禁止使用 x === true
    "no-unnecessary-initializer": true, // 禁止变量初始化为undefined
    "type-literal-delimiter": false, // 语句使用分号
    "import-spacing": true, // import导入时必须带有空格
    "max-line-length": [true, 120],// 单行最大字母数量为120
    "no-trailing-whitespace": true, // 禁止在行尾使用空格
    "semicolon": [true, "always"] // 语句强制使用分号
  }
}
```
