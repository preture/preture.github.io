# TOML 格式说明

TOML（Tom's Obvious Minimal Language）是一种旨在易于阅读和写入的配置文件格式，语义明确。

## 基本语法

```toml
# 这是注释
key = "value"
```

- **键值对**：`键 = 值`
- **大小写敏感**
- **严格 UTF-8 编码**
- **空格缩进**，不依赖缩进层级

## 数据类型

### 字符串

```toml
str1 = "hello world"           # 双引号，支持转义
str2 = 'hello world'           # 单引号，原样输出
str3 = """多行
字符串"""                      # 多行基本字符串
str4 = '''多行
字面量字符串'''                 # 多行字面量字符串
```

转义字符：

```toml
escaped = "换行符\n 制表符\t 反斜杠\\ 双引号\""
```

### 整数

```toml
int1 = 42
int2 = +17
int3 = -10
int4 = 1_000_000              # 下划线分隔，提升可读性
hex = 0xDEADBEEF              # 十六进制
oct = 0o755                   # 八进制
bin = 0b11010110              # 二进制
```

### 浮点数

```toml
float1 = 3.14
float2 = -0.01
float3 = 5.0e+3               # 科学计数法
float4 = inf                  # 无穷大
float5 = nan                  # 非数字
```

### 布尔值

```toml
bool1 = true
bool2 = false
```

### 日期与时间

```toml
date1 = 2024-01-15                    # 日期
date2 = 2024-01-15T14:30:00           # 日期时间
date3 = 2024-01-15T14:30:00+08:00     # 带时区
time1 = 14:30:00                      # 时间
time2 = 14:30:00.500                  # 带毫秒
```

## 数据结构

### 表（Table）

```toml
[server]
host = "localhost"
port = 8080

[server.deploy]           # 嵌套表
env = "production"
```

### 数组

```toml
fruits = ["apple", "banana", "cherry"]
integers = [1, 2, 3]
mixed = [1, "hello", true]
```

多行数组：

```toml
matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
```

### 表数组

```toml
[[users]]
name = "Alice"
age = 25

[[users]]
name = "Bob"
age = 30
```

等价于 JSON：

```json
{
  "users": [
    { "name": "Alice", "age": 25 },
    { "name": "Bob", "age": 30 }
  ]
}
```

### 内联表

```toml
person = { name = "Alice", age = 25 }
```

## 键名

```toml
simple = "简单键名"
"复杂键名.包含点" = "需用引号"
"特殊字符: 空格" = "同样需引号"
```

## 点分隔键

```toml
title = "TOML 示例"
[owner]
name = "Alice"

# 等价于点分隔形式
owner.name = "Alice"
```

## 常见用途

- Rust 的包管理器 Cargo（`Cargo.toml`）
- Python 项目配置（`pyproject.toml`）
- 静态网站生成器 Hugo 的配置
- 各类 CLI 工具配置
