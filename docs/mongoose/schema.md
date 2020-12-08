# 构建数据表结构

mongoose 通过 schema 类类构建表结构

```javascript
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    number: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
    avatar: String,
    sex: Number,
    createDate: { type: Date, default: Date.now },
});
```

mongoose提供了全面的字段类型：

- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal128

如果字段不需要其他参数，可以直接指定字段的类型，如果字段需要其他的选项，可以使用对象声明：

```javascript

// 简单的字段
new mongoose.Schema({
    name: String
})

// 包含其他配置的字段
new mongoose.Schema({
    name: {
        type: String,
        required: true // 必填
    }
})
```