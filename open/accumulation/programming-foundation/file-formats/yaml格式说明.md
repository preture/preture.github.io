---
order: 2
---
# YAML 格式说明

YAML（YAML Ain't Markup Language）是一种人类可读的数据序列化格式，常用于配置文件。

## 基本语法

- **大小写敏感**
- **缩进**：使用空格，不允许 Tab，同一层级缩进量一致
- **注释**：以 `#` 开头

```yaml
# 这是一个注释
key: value
```

## 数据类型

### 字符串

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

### 数字

```yaml
integer: 42
float: 3.14
hex: 0xFF
scientific: 1.0e6
```

### 布尔值

```yaml
bool1: true
bool2: false
bool3: yes       # true 的别名
bool4: no        # false 的别名
bool5: on        # true 的别名
bool6: off       # false 的别名
```

### 空值

```yaml
null1: null
null2: ~
```

## 数据结构

### 映射（字典）

```yaml
person:
  name: Alice
  age: 25
  city: Beijing
```

### 序列（列表）

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

### 复合结构

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

## 锚点与别名（重复内容）

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

## 多文档

用 `---` 分隔多个文档，`...` 可选结束：

```yaml
---
doc1: 第一个文档
---
doc2: 第二个文档
...
```

## 常见用途

- Docker Compose 配置（`docker-compose.yml`）
- CI/CD 配置（GitHub Actions `.yml`、GitLab CI）
- Kubernetes 资源定义
- 静态数据文件
