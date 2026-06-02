# JSON 格式说明

JSON（JavaScript Object Notation）是一种轻量级数据交换格式，易于人阅读和编写，也易于机器解析和生成。

## 基本语法

```json
{
  "key": "value"
}
```

- **键名**：必须用双引号包裹
- **字符串**：必须用双引号，不支持单引号
- **末尾不能有逗号**：最后一个成员后不能加逗号
- **严格 UTF-8 编码**

## 数据类型

### 字符串

```json
{
  "str1": "hello",
  "str2": "hello world",
  "str3": "换行符\n 制表符\t 反斜杠\\ 双引号\"",
  "str4": "Unicode 转义 \u0041"    // → "A"
}
```

### 数字

```json
{
  "integer": 42,
  "negative": -10,
  "float": 3.14,
  "scientific": 1.0e6,
  "zero": 0
}
```

> JSON 不区分整数与浮点数，不支持十六进制、八进制、二进制写法。

### 布尔值

```json
{
  "isActive": true,
  "isDeleted": false
}
```

### 空值

```json
{
  "value": null
}
```

## 数据结构

### 对象（Object）

```json
{
  "person": {
    "name": "Alice",
    "age": 25,
    "city": "Beijing"
  }
}
```

### 数组（Array）

```json
{
  "fruits": ["apple", "banana", "cherry"]
}
```

### 复合结构

```json
{
  "users": [
    {
      "name": "Alice",
      "age": 25,
      "skills": ["Python", "Vue"]
    },
    {
      "name": "Bob",
      "age": 30,
      "skills": ["Java", "Docker"]
    }
  ]
}
```

## 嵌套限制与注意事项

- JSON 没有注释语法（虽然部分解析器支持 `//` 或 `/* */`，但不属于标准）
- 键名必须唯一，重复键的行为因解析器而异
- 不支持 undefined、NaN、Infinity
- 不支持日期类型，通常用字符串（如 ISO 8601）表示

## JSON Schema（结构校验）

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "name": { "type": "string" },
    "age": { "type": "integer", "minimum": 0 },
    "email": { "type": "string", "format": "email" }
  },
  "required": ["name", "email"]
}
```

## 常见用途

- API 请求/响应数据交换（RESTful、GraphQL）
- 配置文件（`package.json`、`tsconfig.json`、`.eslintrc`）
- 数据存储与传输（NoSQL 数据库如 MongoDB）
- Web Storage（`localStorage`、`sessionStorage`）
- 序列化与反序列化
