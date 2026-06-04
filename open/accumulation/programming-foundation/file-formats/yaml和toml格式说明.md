---
order: 2
---
# YAML 和 TOML 格式说明

YAML 和 TOML 是两种主流的配置文件格式，都注重人类可读性，但设计理念有所不同。

## YAML 格式

YAML（YAML Ain't Markup Language）是一种人类可读的数据序列化格式，常用于配置文件。

### 基本语法

- **大小写敏感**
- **缩进**：使用空格，不允许 Tab，同一层级缩进量一致
- **注释**：以 `#` 开头

```yaml
# 这是一个注释
key: value
```

### 数据类型

**字符串：**

```yaml
str1: hello
str2: "hello world"    # 包含空格需引号
str3: 'hello'           # 单引号中的特殊字符不转义
str4: "line1\nline2"    # 双引号支持转义
```

多行字符串：

```yaml
# 保留换行（|）
multi1: |
  第一行
  第二行

# 折叠换行（>）
multi2: >
  这段文本
  会被折叠成一行
```

**数字：**

```yaml
integer: 42
float: 3.14
hex: 0xFF
scientific: 1.0e6
```

**布尔值：**

```yaml
bool1: true
bool2: false
bool3: yes       # true 的别名
bool4: no        # false 的别名
```

**空值：**

```yaml
null1: null
null2: ~
```

### 数据结构

**映射（字典）：**

```yaml
person:
  name: Alice
  age: 25
  city: Beijing
```

**序列（列表）：**

```yaml
fruits:
  - apple
  - banana
  - cherry
```

行内写法：

```yaml
person: { name: Alice, age: 25 }
fruits: [apple, banana, cherry]
```

**复合结构：**

```yaml
users:
  - name: Alice
    age: 25
    skills: [Python, Vue]
  - name: Bob
    age: 30
    skills:
      - Java
      - Docker
```

### 锚点与别名

```yaml
defaults: &defaults
  language: zh-CN
  theme: dark

user1:
  <<: *defaults
  name: Alice

user2:
  <<: *defaults
  name: Bob
  theme: light   # 覆盖默认值
```

### 多文档

用 `---` 分隔多个文档：

```yaml
---
doc1: 第一个文档
---
doc2: 第二个文档
```

---

## TOML 格式

TOML（Tom's Obvious Minimal Language）是一种旨在易于阅读和写入的配置文件格式，语义明确。

### 基本语法

```toml
# 这是注释
key = "value"
```

- **键值对**：`键 = 值`
- **大小写敏感**
- **严格 UTF-8 编码**
- **空格缩进**，不依赖缩进层级

### 数据类型

**字符串：**

```toml
str1 = "hello world"           # 双引号，支持转义
str2 = 'hello world'           # 单引号，原样输出
str3 = """多行
字符串"""                      # 多行基本字符串
```

转义字符：

```toml
escaped = "换行符\n 制表符\t 反斜杠\\ 双引号\""
```

**整数：**

```toml
int1 = 42
int2 = +17
int3 = -10
int4 = 1_000_000              # 下划线分隔，提升可读性
hex = 0xDEADBEEF              # 十六进制
oct = 0o755                   # 八进制
bin = 0b11010110              # 二进制
```

**浮点数：**

```toml
float1 = 3.14
float2 = -0.01
float3 = 5.0e+3               # 科学计数法
float4 = inf                  # 无穷大
float5 = nan                  # 非数字
```

**布尔值：**

```toml
bool1 = true
bool2 = false
```

**日期与时间：**

```toml
date1 = 2024-01-15                    # 日期
date2 = 2024-01-15T14:30:00           # 日期时间
date3 = 2024-01-15T14:30:00+08:00     # 带时区
time1 = 14:30:00                      # 时间
```

### 数据结构

**表（Table）：**

```toml
[server]
host = "localhost"
port = 8080

[server.deploy]           # 嵌套表
env = "production"
```

**数组：**

```toml
fruits = ["apple", "banana", "cherry"]
integers = [1, 2, 3]

# 多行数组
matrix = [
  [1, 2, 3],
  [4, 5, 6],
]
```

**表数组（对象列表）：**

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

**内联表：**

```toml
person = { name = "Alice", age = 25 }
```

### 键名

```toml
simple = "简单键名"
"复杂键名.包含点" = "需用引号"
```

### 点分隔键

```toml
owner.name = "Alice"
# 等价于 [owner] 下 name = "Alice"
```

---

## 格式对比

| 对比项 | YAML | TOML |
|--------|------|------|
| 设计目标 | 人类可读、表达力强 | 最小化、语义明确 |
| 缩进依赖 | ✅ 缩进敏感 | ❌ 不依赖缩进 |
| 类型系统 | 隐式类型推断 | 显式类型（含日期/十六进制） |
| 复杂嵌套 | 天然支持，缩进表达 | 通过表（Table）实现 |
| 锚点/引用 | ✅ 支持（`&` / `*`） | ❌ 不支持 |
| 多文档 | ✅ 支持（`---` 分隔） | ❌ 不支持 |
| 常见场景 | Docker / K8s / CI/CD | Cargo / pyproject.toml |

**选择建议：** 需要表达复杂嵌套或重复结构时选 YAML；追求语义明确、减少歧义时选 TOML。
