---
order: 5
---
# Protocol Buffers 格式说明

Protocol Buffers（简称 Protobuf）是 Google 开发的一种语言中立、平台无关、高效可扩展的序列化结构化数据格式，用于通信协议、数据存储等场景。

## 与 JSON/XML 的对比

| 对比项 | Protobuf | JSON | XML |
|--------|----------|------|-----|
| 编码方式 | 二进制 | 文本 | 文本 |
| 数据大小 | 极小（压缩后更小） | 较大 | 很大 |
| 解析速度 | 极快（无需解析文本） | 较快 | 慢 |
| 可读性 | 不可读（需配合 `.proto` 文件） | 直接可读 | 直接可读 |
| 类型约束 | 强类型，需定义 Schema | 弱类型 | 弱类型 |
| Schema 定义 | `.proto` 文件 | 无（可配合 JSON Schema） | DTD / XSD |
| 版本兼容 | 原生支持（字段编号 + 可选/必选） | 需手动处理 | 需手动处理 |
| 多语言支持 | C++ / Java / Python / Go / Rust 等 10+ 语言 | 所有语言 | 所有语言 |

**一句话总结：** Protobuf 体积小、速度快、类型安全，适合内部服务通信；JSON/XML 可读性强、通用性好，适合 API 对外开放。

## 定义 `.proto` 文件

Protobuf 使用 `.proto` 文件定义数据结构（消息类型）：

```protobuf
syntax = "proto3";          // 使用 proto3 版本

package user;               // 包名，避免命名冲突

// 定义一个用户消息
message User {
  int64  id       = 1;      // 字段编号 1
  string name     = 2;      // 字段编号 2
  string email    = 3;      // 字段编号 3
  int32  age      = 4;      // 字段编号 4
  Gender gender   = 5;      // 枚举类型
}

// 枚举
enum Gender {
  GENDER_UNKNOWN = 0;       // proto3 枚举第一个值必须为 0
  GENDER_MALE    = 1;
  GENDER_FEMALE = 2;
}

// 嵌套消息
message Address {
  string country = 1;
  string city    = 2;
  string detail  = 3;
}

message Company {
  string name    = 1;
  Address addr   = 2;       // 引用其他消息类型
}
```

### 字段编号

每个字段必须有一个唯一的**字段编号**（1 ~ 536,870,911）：

| 编号范围 | 用途 | 说明 |
|---------|------|------|
| 1 ~ 15 | 频繁出现的字段 | 占用 1 字节，应留给最常用的字段 |
| 16 ~ 2047 | 一般字段 | 占用 2 字节 |
| 19000 ~ 19999 | 预留 | Protobuf 实现内部使用 |
| 其他 | 不常用字段 | 占用更多字节 |

字段编号一旦使用，**不应修改**——它是二进制编码中的唯一标识。淘汰的字段编号用 `reserved` 标记：

```protobuf
message User {
  reserved 6, 10, 15;            // 保留字段编号
  reserved "phone", "fax";       // 保留字段名（防止误用）
  // ...
}
```

## 标量类型

| `.proto` 类型 | 对应 Python 类型 | 对应 Java 类型 | 说明 |
|---------------|-----------------|---------------|------|
| `double` | `float` | `double` | 64 位浮点数 |
| `float` | `float` | `float` | 32 位浮点数 |
| `int32` | `int` | `int` | 32 位变长编码 |
| `int64` | `int` | `long` | 64 位变长编码 |
| `uint32` | `int` | `int` | 无符号 32 位 |
| `uint64` | `int` | `long` | 无符号 64 位 |
| `sint32` | `int` | `int` | 有符号 32 位（负值编码更高效） |
| `sint64` | `int` | `long` | 有符号 64 位 |
| `fixed32` | `int` | `int` | 固定 4 字节（值 > 2^28 时比 `int32` 高效） |
| `fixed64` | `int` | `long` | 固定 8 字节 |
| `sfixed32` | `int` | `int` | 有符号固定 4 字节 |
| `sfixed64` | `int` | `long` | 有符号固定 8 字节 |
| `bool` | `bool` | `boolean` | 布尔值 |
| `string` | `str` | `String` | UTF-8 字符串 |
| `bytes` | `bytes` | `ByteString` | 二进制数据 |

## 字段规则

### `singular`（默认）

每个字段出现零次或一次，是 proto3 的默认规则。

### `optional`

显式标记字段为可选，区分"未设置"和"默认值"：

```protobuf
message User {
  int64  id              = 1;
  string name            = 2;
  optional string phone  = 3;   // 未设置时 phone 为 None
}
```

### `repeated`

字段可以重复任意次（包括零次），相当于数组/列表：

```protobuf
message Team {
  string name     = 1;
  repeated User members = 2;    // 多个成员
}
```

### `map`

键值对映射：

```protobuf
message Config {
  map<string, string> settings = 1;
}
```

## 编译与使用

### 安装 protoc

```bash
# macOS
brew install protobuf

# Ubuntu / Debian
sudo apt install protobuf-compiler

# 验证
protoc --version
```

### 编译 `.proto` 文件

```bash
# 编译为 Python
protoc --python_out=. user.proto

# 编译为 Java
protoc --java_out=. user.proto

# 编译为 Go（需要安装 protoc-gen-go）
protoc --go_out=. user.proto
```

编译后会生成对应的代码文件（如 `user_pb2.py`）。

### Python 使用示例

```python
import user_pb2

# 创建消息
user = user_pb2.User()
user.id = 1001
user.name = "Alice"
user.email = "alice@example.com"
user.age = 25
user.gender = user_pb2.GENDER_FEMALE

# 序列化（二进制）
data = user.SerializeToString()
print(f"序列化后大小：{len(data)} 字节")
# JSON 等效数据大约是这个的 5~10 倍

# 反序列化
new_user = user_pb2.User()
new_user.ParseFromString(data)
print(new_user.name)  # Alice
```

## 实际应用场景

### 微服务间 RPC 通信

```protobuf
service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (ListUsersResponse);
  rpc CreateUser (CreateUserRequest) returns (User);
}

message GetUserRequest {
  int64 user_id = 1;
}

message ListUsersRequest {
  int32 page_size = 1;
  int32 page_num  = 2;
}

message ListUsersResponse {
  repeated User users = 1;
  int32 total_count   = 2;
}
```

搭配 gRPC 框架使用，自动生成客户端和服务端代码。

### 配置文件

相比 YAML/TOML，Protobuf 作配置的优势是类型安全和可校验：

```protobuf
message AppConfig {
  string app_name    = 1;
  string environment = 2;       // "dev" / "staging" / "production"
  int32  port        = 3;
  DatabaseConfig db  = 4;
  LogConfig log      = 5;
}

message DatabaseConfig {
  string host     = 1;
  int32  port     = 2;
  string username = 3;
  string password = 4;
  string database = 5;
}

message LogConfig {
  string level      = 1;       // "DEBUG" / "INFO" / "WARN" / "ERROR"
  string output     = 2;       // "stdout" / "file"
  int32  max_size_mb = 3;
}
```

### 数据持久化

```python
import user_pb2

# 写入文件
user = user_pb2.User(id=1, name="Alice", email="alice@example.com")
with open("user.bin", "wb") as f:
    f.write(user.SerializeToString())

# 读取文件
with open("user.bin", "rb") as f:
    user = user_pb2.User()
    user.ParseFromString(f.read())
```

## 版本兼容设计

Protobuf 的设计原则之一是**向前向后兼容**：

| 变更类型 | 是否兼容 | 说明 |
|---------|---------|------|
| 新增字段 | ✅ 兼容 | 老代码忽略新字段，新代码使用默认值 |
| 删除字段 | ✅ 兼容（需 `reserved`） | 确保没有其他代码使用该编号 |
| 修改字段类型 | ❌ 不兼容 | 需评估编码兼容性 |
| 修改字段编号 | ❌ 不兼容 | 永远不要改已有的字段编号 |
| 新增枚举值 | ✅ 兼容 | 但可能导致未知枚举值 |
| 修改消息名称 | ❌ 不兼容 | 编译后类名变化 |

## 使用建议

- **内部服务通信**：优先使用 Protobuf + gRPC，性能优于 RESTful JSON
- **对外 API**：考虑用 Protobuf 定义 Schema，对外暴露 JSON（通过 `json_format` 转换）
- **数据存储**：日志、事件等结构化数据用 Protobuf 编码，节省存储空间
- **配置文件**：YAML/TOML 更易读，Protobuf 适合作配置模板和校验
- **版本管理**：`.proto` 文件应纳入版本控制，作为接口文档
