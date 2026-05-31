# Python 编程基础

## 1. 环境搭建

### 下载与安装

- 官网下载：[python.org](https://www.python.org/downloads/)
- 安装时勾选 **"Add Python to PATH"**
- 验证安装：

```bash
python --version
pip --version
```

### 包管理工具 pip

```bash
pip install <包名>       # 安装包
pip install <包名>==1.0  # 指定版本
pip list                 # 查看已安装包
pip install ipython      # 推荐安装，交互式环境更好用
```

### IDE 选择

| IDE | 特点 | 适用人群 |
|-----|------|---------|
| **VS Code** | 轻量、插件丰富、免费 | 推荐初学者 |
| **PyCharm** | 功能全面、专为 Python 设计 | 专业开发 |
| **IDLE** | Python 自带、零配置 | 临时测试 |
| **Jupyter Notebook** | 交互式、适合数据分析 | 数据科学 |

### 第一个程序

```python
print("Hello, World!")  # Hello, World!
```

运行方式：
1. 终端：`python hello.py`
2. PyCharm：右键 → Run Python File
3. `python -c 'print("Hello, World!")'`

### Python 交互式环境

```bash
python
>>> print("Hello")
Hello
>>> exit()
```

或用 `ipython`（需安装）体验更好。

---

## 2. 基础语法

### 2.1 注释

```python
# 这是单行注释

"""
这是多行注释
可以写多行说明文字
"""

print("Hello")  # Hello  行尾注释
```

### 2.2 变量

#### 变量赋值

```python
name = "Alice"       # 字符串
age = 25             # 整数
height = 1.68        # 浮点数
is_student = True    # 布尔值

# Python 是动态类型，变量类型可改变
x = 10
x = "hello"  # 没问题
```

#### 变量命名规则

- 只能包含字母、数字、下划线
- 不能以数字开头
- 区分大小写（`name` ≠ `Name`）
- 不能使用关键字（`if` `for` `class` 等）

```python
# 合法
my_name = "Alice"
name2 = "Bob"
_age = 25

# 不合法
2name = "Tom"    # SyntaxError
my-name = "Tom"  # SyntaxError
class = "Tom"    # SyntaxError（关键字）
```

#### 命名规范

```python
# 变量/函数：蛇形命名（snake_case）
user_name = "Alice"
def get_age():
    pass

# 常量：全大写
MAX_SIZE = 100
PI = 3.14159
```

#### 多重赋值

```python
a, b, c = 1, 2, 3          # a=1, b=2, c=3
a = b = c = 0              # 三个都等于 0
x, y = y, x                # 交换变量值（不需要中间变量）
```

### 2.3 基本数据类型

| 类型 | 示例 | 说明 |
|------|------|------|
| `int` | `10` `-3` `0` | 整数 |
| `float` | `3.14` `-0.5` `1e3` | 浮点数 |
| `str` | `"hello"` `'world'` | 字符串 |
| `bool` | `True` `False` | 布尔值 |
| `NoneType` | `None` | 空值 |

```python
# 类型检查
type(10)        # <class 'int'>
type(3.14)      # <class 'float'>
type("hello")   # <class 'str'>
type(True)      # <class 'bool'>
type(None)      # <class 'NoneType'>

# 类型转换
int("123")       # 123
str(123)         # "123"
float("3.14")    # 3.14
bool(1)          # True
bool(0)          # False
bool("")         # False
bool("abc")      # True
```

### 2.4 运算符

#### 算术运算符

```python
10 + 3       # 13  加法
10 - 3       # 7   减法
10 * 3       # 30  乘法
10 / 3       # 3.333...  除法
10 // 3      # 3   整除
10 % 3       # 1   取余
2 ** 3       # 8   幂运算
```

```python
# 字符串运算
"Hello" + " " + "World"  # "Hello World"
"Ha" * 3                 # "HaHaHa"
```

#### 比较运算符

```python
10 == 10     # True  等于
10 != 3      # True  不等于
10 > 3       # True  大于
10 < 3       # False 小于
10 >= 10     # True  大于等于
10 <= 3      # False 小于等于
```

#### 逻辑运算符

```python
True and False   # False  与
True or False    # True   或
not True         # False  非
```

```python
# 短路求值
True or print("不会执行")    # 不执行 print
False and print("不会执行")  # 不执行 print

# 实战
age = 20
has_id = True
if age >= 18 and has_id:
    print("可以进入")
```

#### 赋值运算符

```python
x = 10
print(x)      # 10
x += 3        # x = x + 3
print(x)      # 13
x -= 2
print(x)      # 11
x *= 2
print(x)      # 22
x /= 2
print(x)      # 11.0
x //= 3
print(x)      # 3.0
x %= 2
print(x)      # 1.0
x **= 3
print(x)      # 1.0
```

### 2.5 输入与输出

```python
# 输出
print("Hello, World!")
print("a =", 10)              # a = 10
print("a", "b", "c", sep="-") # a-b-c
print("Hello", end="")        # 不换行

# 输入（返回字符串）
name = input("请输入你的名字：")
age = int(input("请输入你的年龄："))  # 转为整数
```

---

## 3. 条件判断

### 3.1 `if` 语句

```python
age = 18

if age >= 18:
    print("成年人")
```

### 3.2 `if/else`

```python
age = 16

if age >= 18:
    print("成年人")
else:
    print("未成年人")
```

### 3.3 `if/elif/else`

```python
score = 85

if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 70:
    print("中等")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

### 3.4 嵌套条件

```python
age = 20
has_ticket = True

if age >= 18:
    if has_ticket:
        print("请入场")
    else:
        print("请先购票")
else:
    print("未成年人不得入场")
```

### 3.5 真值判断

```python
# 以下值被视为 False
bool(False)   # False
bool(0)       # False
bool(0.0)     # False
bool("")      # False  空字符串
bool([])      # False  空列表
bool({})      # False  空字典
bool(None)    # False

# 其他所有值都是 True
bool("abc")   # True
bool([0])     # True
bool({"a": 1})  # True
```

```python
name = input("请输入姓名：")

if name:        # 等价于 if name != ""
    print(f"你好，{name}")
else:
    print("姓名不能为空！")
```

---

## 4. 数据结构

### 4.1 列表（List）

列表用 `[]` 表示，可存放任意类型。

```python
# 创建
empty = []
nums = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]
nested = [[1, 2], [3, 4]]  # 嵌套列表

# 索引（从 0 开始）
nums[0]    # 1
nums[-1]   # 5（倒数第一个）
nums[-2]   # 4（倒数第二个）

# 修改
nums[0] = 10    # [10, 2, 3, 4, 5]
```

#### 列表常用方法

```python
nums = [3, 1, 4, 1, 5, 9, 2]

nums.append(6)          # 末尾添加 → [3,1,4,1,5,9,2,6]
nums.insert(0, 0)       # 指定位置插入 → [0,3,1,4,1,5,9,2,6]
nums.remove(1)          # 删除第一个匹配项 → [0,3,4,1,5,9,2,6]
nums.pop()              # 删除并返回末尾 → 6，列表变为 [0,3,4,1,5,9,2]
nums.pop(0)             # 删除并返回索引 0 → 0，列表变为 [3,4,1,5,9,2]
nums.sort()             # 原地排序 → [1,2,3,4,5,9]
nums.reverse()          # 反转 → [9,5,4,3,2,1]
len(nums)               # 长度 → 6
nums.count(1)           # 统计 1 出现次数 → 1
nums.index(3)           # 查找 3 的索引 → 2
2 in nums               # 判断是否包含 → True
```

#### 列表切片

```python
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

nums[2:5]      # [2, 3, 4]        [start:stop]
nums[:4]       # [0, 1, 2, 3]     [ :stop]
nums[4:]       # [4, 5, 6, 7, 8, 9]  [start: ]
nums[:]        # [0...9]          复制整个列表
nums[::2]      # [0, 2, 4, 6, 8]  [start:stop:step]
nums[::-1]     # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]  反转
nums[1:8:3]    # [1, 4, 7]        步长 3
```

### 4.2 元组（Tuple）

元组用 `()` 表示，**不可修改**。

```python
# 创建
empty = ()
point = (3, 5)
single = (1,)         # 注意逗号！不加就是整数
without_parentheses = 1, 2, 3  # 也可以不加括号

# 访问（和列表一样）
point[0]    # 3
point[-1]   # 5

# 不能修改
point[0] = 10  # TypeError！

# 用途：函数返回多个值
def min_max(lst):
    return min(lst), max(lst)  # 返回元组

result = min_max([3, 1, 4, 1, 5])
print(result)        # (1, 5)
low, high = result   # 解包 → low=1, high=5
```

#### 列表 vs 元组

| 特性 | 列表 | 元组 |
|------|------|------|
| 可变 | 可增删改 | 不可变 |
| 性能 | 较慢 | 较快 |
| 用途 | 动态数据 | 固定数据 |
| 可哈希 | 不能做字典键 | 可以做字典键 |

```python
# 元组拆包（解包）
name, age, city = ("Alice", 25, "Beijing")

# 交换变量用到了元组拆包
a, b = b, a

# * 收集剩余元素
first, *rest = [1, 2, 3, 4, 5]
# first=1, rest=[2,3,4,5]

first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2,3,4], last=5
```

### 4.3 字典（Dict）

字典用 `{}` 表示，存储 **键值对**。

```python
# 创建
empty = {}
person = {"name": "Alice", "age": 25, "city": "Beijing"}

# 访问
person["name"]          # "Alice"
person.get("name")      # "Alice"
person.get("score")     # None（键不存在不报错）
person.get("score", 0)  # 0（指定默认值）

# 修改/添加
person["age"] = 26      # 修改
person["job"] = "工程师"  # 新增

# 删除
del person["city"]      # 删除键值对
person.pop("age")       # 删除并返回值

# 判断键是否存在
"name" in person        # True
"salary" in person      # False
```

#### 字典常用方法

```python
d = {"a": 1, "b": 2, "c": 3}

d.keys()      # dict_keys(['a', 'b', 'c'])    所有键
d.values()    # dict_values([1, 2, 3])         所有值
d.items()     # dict_items([('a',1), ('b',2), ('c',3)])  所有键值对

d.update({"d": 4, "e": 5})  # 合并字典
d.setdefault("f", 6)        # 键不存在时设置默认值
```

#### 字典遍历

```python
d = {"a": 1, "b": 2, "c": 3}

# 遍历键
for key in d:
    print(key)

for key in d.keys():
    print(key)

# 遍历值
for value in d.values():
    print(value)

# 遍历键值对
for key, value in d.items():
    print(f"{key}: {value}")
```

### 4.4 集合（Set）

集合用 `{}` 表示，**无序、不重复**。

```python
empty = set()          # set()  注意：{} 是空字典
nums = {1, 2, 3, 2, 1}  # {1, 2, 3}（重复被去除）
lst = [1, 2, 2, 3, 3, 3]
unique = set(lst)      # {1, 2, 3}  去重

# 常用操作
s = {1, 2, 3}
s.add(4)              # s 变为 {1, 2, 3, 4}
s.remove(3)           # s 变为 {1, 2, 4}（不存在报错）
s.discard(10)         # s 仍为 {1, 2, 4}（不存在不报错）
s.pop()               # 删除并返回任意一个元素
s.clear()             # s 变为 set()
```

#### 集合运算

```python
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

a | b   # 并集  {1, 2, 3, 4, 5, 6}
a & b   # 交集  {3, 4}
a - b   # 差集  {1, 2}
a ^ b   # 对称差  {1, 2, 5, 6}
```

### 4.5 类型小结

| 类型 | 可变 | 有序 | 可重复 | 表示 |
|------|------|------|--------|------|
| `list` | 是 | 是 | 是 | `[1, 2, 3]` |
| `tuple` | 否 | 是 | 是 | `(1, 2, 3)` |
| `dict` | 是 | 是（3.7+ 有序） | 键不重复 | `{"a": 1}` |
| `set` | 是 | 否 | 否 | `{1, 2, 3}` |

---

## 5. 循环

### 5.1 `for` 循环

```python
# 遍历列表
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# 遍历字符串
for char in "hello":
    print(char)  # h e l l o

# 遍历 range
for i in range(5):
    print(i)        # 0 1 2 3 4

for i in range(1, 6):
    print(i)        # 1 2 3 4 5

for i in range(0, 10, 2):
    print(i)        # 0 2 4 6 8

# 带索引遍历
fruits = ["apple", "banana", "cherry"]
for i in range(len(fruits)):
    print(i, fruits[i])

# 更优雅的方式
for i, fruit in enumerate(fruits):
    print(i, fruit)

# 遍历字典
person = {"name": "Alice", "age": 25, "city": "Beijing"}
for key, value in person.items():
    print(f"{key}: {value}")

# 遍历多个列表（zip）
names = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]
for name, score in zip(names, scores):
    print(f"{name}: {score}")
```

### 5.2 `while` 循环

```python
# 基础用法
i = 1
while i <= 5:
    print(i)
    i += 1

# 不确定次数的循环
import random
target = random.randint(1, 100)
guess = None

while guess != target:
    guess = int(input("猜一个数（1-100）："))
    if guess < target:
        print("小了")
    elif guess > target:
        print("大了")
print("猜对了！")
```

### 5.3 `break` 和 `continue`

```python
# break — 跳出整个循环
for i in range(10):
    if i == 5:
        break
    print(i)          # 0 1 2 3 4

# continue — 跳过本次循环
for i in range(10):
    if i % 2 == 0:
        continue      # 跳过偶数
    print(i)          # 1 3 5 7 9
```

### 5.4 `for/else` 和 `while/else`

`else` 在循环 **正常结束**（未触发 `break`）时执行。

```python
# 查找素数
num = 17
for i in range(2, num):
    if num % i == 0:
        print(f"{num} 不是素数")
        break
else:
    print(f"{num} 是素数")  # 17 是素数

# 搜索模式
names = ["Alice", "Bob", "Charlie", "David"]
search = "Charlie"

for name in names:
    if name == search:
        print("找到了！")
        break
else:
    print("未找到")
```

### 5.5 嵌套与组合

```python
# 列表嵌套字典
students = [
    {"name": "Alice", "score": 88},
    {"name": "Bob", "score": 72},
    {"name": "Charlie", "score": 95},
]

for student in students:
    print(f'{student["name"]}: {student["score"]}')

# 字典嵌套列表
course = {
    "name": "Python 入门",
    "students": ["Alice", "Bob", "Charlie"],
    "topics": ["变量", "循环", "函数"],
}

# 二维列表（矩阵）
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]

for row in matrix:
    for num in row:
        print(num, end=" ")
    print()
```

---

## 6. 函数

### 6.1 函数定义与调用

```python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Hello, Alice!
```

- `def` 关键字
- 函数名 + `()` + `:`
- 函数体缩进
- 先定义后调用

### 6.2 参数类型

| 参数类型 | 示例 | 说明 |
|---------|------|------|
| 位置参数 | `def add(a, b)` | 按顺序传入 |
| 默认参数 | `def greet(name="World")` | 不传时使用默认值 |
| 关键字参数 | `add(b=2, a=1)` | 按名称传入，顺序可调 |
| 可变位置参数 | `def f(*args)` | 接收任意数量位置参数 |
| 可变关键字参数 | `def f(**kwargs)` | 接收任意数量关键字参数 |

```python
# 位置参数
def add(a, b):
    return a + b

print(add(1, 2))  # 3

# 默认参数
def greet(name="World"):
    print(f"Hello, {name}!")

greet()          # Hello, World!
greet("Alice")   # Hello, Alice!

# 关键字参数
def introduce(name, age, city):
    print(f"{name}, {age}岁, 来自{city}")

introduce(city="Beijing", age=25, name="Alice")

# *args：任意数量位置参数
def sum_all(*args):
    return sum(args)

print(sum_all(1, 2, 3, 4))  # 10

# **kwargs：任意数量关键字参数
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=25, city="Beijing")
```

#### 默认参数陷阱

```python
def add_item(item, lst=[]):  # 默认参数只在定义时创建一次！
    lst.append(item)
    return lst

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2]  ← 同一个列表！
```

修复方案：

```python
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print(add_item(1))  # [1]
print(add_item(2))  # [2]
```

### 6.3 `return` 语句

- 返回值给调用方
- 没有 `return` → 返回 `None`
- 可以返回多个值（本质是元组）

```python
def min_max(lst):
    return min(lst), max(lst)

values = [3, 1, 4, 1, 5]
low, high = min_max(values)
print(low, high)  # 1 5
```

### 6.4 作用域（Scope）

| 作用域 | 关键字 | 说明 |
|--------|--------|------|
| 局部（Local） | — | 函数内部 |
| 嵌套（Enclosing） | `nonlocal` | 外层函数 |
| 全局（Global） | `global` | 模块级别 |
| 内置（Built-in） | — | Python 内置名称 |

#### LEGB 查找规则

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)  # local

    inner()
    print(x)  # enclosing
outer()
print(x)  # global
```

#### `global` 与 `nonlocal`

```python
count = 0

def increment():
    global count
    count += 1  # 修改全局变量

def outer():
    x = 10

    def inner():
        nonlocal x
        x += 1  # 修改外层函数的变量

    inner()
    print(x)  # 11
```

### 6.5 文档字符串（docstring）

```python
def add(a, b):
    """返回 a 与 b 的和。"""
    return a + b

help(add)  # 显示文档字符串
```

### 6.6 `lambda` 表达式

- 匿名函数，一行表达式
- 语法：`lambda 参数: 返回值`

```python
square = lambda x: x ** 2
print(square(5))  # 25

# 等价于
def square(x):
    return x ** 2
```

**适用场景**：作为参数传给高阶函数（一次性使用）

### 6.7 高阶函数

#### `map(function, iterable)` — 映射

```python
nums = [1, 2, 3, 4]
squared = list(map(lambda x: x ** 2, nums))
# [1, 4, 9, 16]

# 等价推导式
squared = [x ** 2 for x in nums]
```

#### `filter(function, iterable)` — 过滤

```python
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4, 6]

# 等价推导式
evens = [x for x in nums if x % 2 == 0]
```

#### `sorted(iterable, key=..., reverse=...)` — 排序

```python
students = [
    {"name": "Alice", "score": 88},
    {"name": "Bob", "score": 72},
    {"name": "Charlie", "score": 95},
]

# 按成绩升序
by_score = sorted(students, key=lambda s: s["score"])
for s in by_score:
    print(s["name"], s["score"])
# Bob 72
# Alice 88
# Charlie 95
```

#### `reduce(function, iterable)` — 累计（需从 `functools` 导入）

```python
from functools import reduce

nums = [1, 2, 3, 4]
total = reduce(lambda a, b: a + b, nums)  # 10
```

---

## 7. 推导式

### 7.1 列表推导式

```python
[x ** 2 for x in range(10)]                    # [0, 1, 4, ..., 81]
[x for x in range(20) if x % 3 == 0]           # [0, 3, 6, 9, 12, 15, 18]
[x * y for x in range(1, 4) for y in range(1, 4)]  # [1, 2, 3, 2, 4, 6, 3, 6, 9]
```

### 7.2 字典推导式

```python
{x: x ** 2 for x in range(5)}   # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
{word: len(word) for word in ["apple", "banana", "cherry"]}  # {'apple': 5, 'banana': 6, 'cherry': 6}
```

### 7.3 集合推导式

```python
{x % 3 for x in range(10)}  # {0, 1, 2}
```

### 7.4 生成器表达式（惰性求值）

```python
squares = (x ** 2 for x in range(1000000))  # 不立即计算
next(squares)  # 0
next(squares)  # 1
```

### 7.5 三者对比

```python
# 命令式
result = []
for x in range(10):
    if x % 2 == 0:
        result.append(x ** 2)
print(result)  # [0, 4, 16, 36, 64]

# 推导式（推荐）
result = [x ** 2 for x in range(10) if x % 2 == 0]
print(result)  # [0, 4, 16, 36, 64]

# map/filter
result = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, range(10))))
print(result)  # [0, 4, 16, 36, 64]
```

**原则**：能写推导式用推导式，可读性最高。

---

## 8. 常用内置函数

### 8.1 `enumerate` — 带索引遍历

```python
fruits = ["apple", "banana", "cherry"]

for i, fruit in enumerate(fruits):
    print(i, fruit)  # 0 apple / 1 banana / 2 cherry

for i, fruit in enumerate(fruits, start=1):  # 从 1 开始
    print(i, fruit)  # 1 apple / 2 banana / 3 cherry
```

### 8.2 `zip` — 并行打包

```python
names = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]

for name, score in zip(names, scores):
    print(f"{name}: {score}")  # Alice: 88 / Bob: 72 / Charlie: 95

# 转成字典
result = dict(zip(names, scores))
# {"Alice": 88, "Bob": 72, "Charlie": 95}

# 解压
pairs = [(1, "a"), (2, "b"), (3, "c")]
numbers, letters = zip(*pairs)
# numbers = (1, 2, 3), letters = ("a", "b", "c")
```

### 8.3 `any` / `all` — 逻辑判断

```python
nums = [0, 1, 2, 3]

any(nums)   # True（至少一个为真）
all(nums)   # False（0 为假）

# 实战：检查列表中是否有偶数
has_even = any(x % 2 == 0 for x in [1, 3, 5, 6])  # True

# 检查是否全部及格
all_pass = all(score >= 60 for score in [72, 88, 45])  # False
```

### 8.4 `random` 模块

```python
import random

print(random.random())                # 如 0.374582  [0.0, 1.0) 随机浮点数
print(random.randint(1, 10))          # 如 7  [1, 10] 随机整数
print(random.choice(["a", "b", "c"])) # 如 'b'  随机选一个
print(random.sample(range(100), 5))   # 如 [23, 67, 45, 12, 89]  不重复抽样 5 个
lst = [1, 2, 3, 4, 5]
random.shuffle(lst)                   # lst 变为随机顺序
print(lst)
```

### 8.5 `math` 模块

```python
import math

print(math.ceil(3.2))     # 4  向上取整
print(math.floor(3.8))    # 3  向下取整
print(math.sqrt(16))      # 4.0  平方根
print(math.pi)            # 3.141592653589793
print(math.pow(2, 10))    # 1024.0  幂运算
print(math.factorial(5))  # 120  阶乘
```

### 8.6 排序相关

| 函数 | 说明 |
|------|------|
| `sorted(iterable)` | 返回新排序列表 |
| `list.sort()` | 原地排序，修改原列表 |
| `reversed(iterable)` | 返回反向迭代器 |

```python
nums = [3, 1, 4, 1, 5]
sorted_nums = sorted(nums)  # [1, 1, 3, 4, 5]，nums 不变
nums.sort()                 # nums 变为 [1, 1, 3, 4, 5]
```

### 8.7 其他常用内置函数

```python
len([1, 2, 3])                    # 3  长度
type(42)                          # <class 'int'>  类型
int("123")                        # 123  类型转换
str(123)                          # '123'
float("3.14")                     # 3.14
list("abc")                       # ['a', 'b', 'c']
range(5)                          # range(0, 5)  范围
sum([1, 2, 3, 4, 5])             # 15  求和
min(3, 1, 4, 1, 5)               # 1  最小值
max(3, 1, 4, 1, 5)               # 5  最大值
abs(-10)                          # 10  绝对值
round(3.14159, 2)                # 3.14  四舍五入
isinstance(42, int)               # True  类型判断
```

---

## 9. 字符串操作

### 9.1 字符串索引与切片

```python
s = "Hello, Python"

# 索引（从 0 开始）
s[0]     # 'H'
s[-1]    # 'n'（倒数第一个）

# 切片 [start:stop:step]
s[0:5]      # 'Hello'
s[7:]       # 'Python'
s[:5]       # 'Hello'
s[::-1]     # 'nohtyP ,olleH'（反转）
s[::2]      # 'Hlo yhn'（隔一个取一个）
```

### 9.2 常用字符串方法

#### 分割与连接

```python
# split — 分割
"apple,banana,cherry".split(",")   # ['apple', 'banana', 'cherry']
"a b c".split()                     # ['a', 'b', 'c']

# join — 连接（注意是用分隔符调用）
words = ["Python", "is", "fun"]
" ".join(words)                     # 'Python is fun'
", ".join(words)                    # 'Python, is, fun'
"".join(words)                      # 'Pythonisfun'
```

#### 去除空白

```python
"  hello  ".strip()      # 'hello'
"  hello  ".lstrip()     # 'hello  '
"  hello  ".rstrip()     # '  hello'
"***hello***".strip("*") # 'hello'
```

#### 替换

```python
"hello world".replace("world", "Python")   # 'hello Python'
"a,b,c".replace(",", " | ")                # 'a | b | c'
```

#### 查找与判断

```python
"Hello, Python".find("Python")   # 7（返回索引，找不到返回 -1）
"Hello, Python".index("Python")  # 7（找不到抛异常）
"Hello".startswith("He")         # True
"Hello".endswith("lo")           # True
"Hello123".isalpha()             # False（有数字）
"Hello".isalpha()                # True
"123".isdigit()                  # True
"  ".isspace()                   # True
```

#### 大小写转换

```python
"hello".upper()        # 'HELLO'
"HELLO".lower()        # 'hello'
"hello world".title()  # 'Hello World'
"hello world".capitalize()  # 'Hello world'
```

### 9.3 f-string（格式化字符串，Python 3.6+）

```python
name = "Alice"
age = 25
height = 1.68

f"我叫 {name}，今年 {age} 岁。"           # '我叫 Alice，今年 25 岁。'
```

#### 数字格式化

```python
pi = 3.1415926535

f"{pi:.2f}"       # '3.14'（保留 2 位小数）
f"{pi:.3f}"       # '3.142'（保留 3 位小数）
f"{pi:.0f}"       # '3'（保留 0 位小数）

score = 0.875
f"{score:.1%}"    # '87.5%'（百分比）
```

#### 对齐与填充

```python
name = "Alice"

f"{name:>10}"     # '     Alice'（右对齐，宽度 10）
f"{name:<10}"     # 'Alice     '（左对齐，宽度 10）
f"{name:^10}"     # '  Alice   '（居中对齐，宽度 10）
f"{name:*^10}"    # '**Alice***'（填充 *，居中）
```

#### 千位分隔符

```python
num = 1234567
f"{num:,}"        # '1,234,567'
f"{num:_}"        # '1_234_567'
```

#### 综合示例

```python
products = [
    ("iPhone", 7999, 0.15),
    ("iPad", 3499, 0.10),
    ("MacBook", 12999, 0.20),
]

print(f"{'商品':<10}{'原价':>8}{'折扣':>8}{'折后价':>10}")
print("-" * 36)
for name, price, discount in products:
    final = price * (1 - discount)
    print(f"{name:<10}{price:>8,}{discount:>7.0%}{final:>10,.0f}")
```

输出：
```
商品              原价     折扣     折后价
------------------------------------
iPhone           7,999     15%      6,799
iPad             3,499     10%      3,149
MacBook         12,999     20%     10,399
```

### 9.4 多行字符串

```python
text = """
这是一个多行字符串。
可以包含换行和缩进。
"""
print(text)

# 结合 f-string
name = "Alice"
age = 25
bio = f"""
姓名：{name}
年龄：{age}
职业：学生
"""
print(bio)
```

### 9.5 字符串不可变性

```python
s = "hello"
s[0] = "H"  # TypeError！字符串不可变

# 正确做法：创建新字符串
s = "H" + s[1:]  # 'Hello'
print(s)          # Hello
s = s.replace("h", "H")
print(s)          # Hello
```

---

## 10. 类与继承

### 10.1 类定义

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name} 汪汪！")

    def info(self):
        return f"{self.name}，{self.age} 岁"

# 创建实例
my_dog = Dog("旺财", 3)
my_dog.bark()           # 旺财 汪汪！
print(my_dog.info())    # 旺财，3 岁
```

- `class` 关键字定义类
- `__init__` 是构造方法，创建实例时自动调用
- `self` 指向实例本身，第一个参数必须是它

### 10.2 类属性 vs 实例属性

```python
class Student:
    school = "第一中学"  # 类属性，所有实例共享

    def __init__(self, name):
        self.name = name  # 实例属性，每个实例独有

s1 = Student("Alice")
s2 = Student("Bob")

print(s1.school)  # 第一中学
print(s2.school)  # 第一中学
print(s1.name)    # Alice
print(s2.name)    # Bob

# 修改类属性影响所有实例
Student.school = "第二中学"
print(s1.school)  # 第二中学

# 实例修改类属性会创建新的实例属性
s1.school = "第三中学"
print(s1.school)  # 第三中学（仅 s1 改变）
print(s2.school)  # 第二中学（不影响其他实例）
```

### 10.3 继承

```python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        print(f"{self.name} 发出声音")

class Cat(Animal):
    def speak(self):
        print(f"{self.name} 喵喵～")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} 汪汪！")

animals = [Cat("咪咪"), Dog("旺财")]
for animal in animals:
    animal.speak()
# 咪咪 喵喵～
# 旺财 汪汪！
```

#### `super()` 调用父类方法

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Cat(Animal):
    def __init__(self, name, color):
        super().__init__(name)   # 调用父类的 __init__
        self.color = color

    def info(self):
        return f"{self.color}的猫 {self.name}"

cat = Cat("咪咪", "白色")
print(cat.info())  # 白色的猫 咪咪
```

### 10.4 多继承与 MRO

```python
class A:
    def method(self):
        print("A.method")

class B(A):
    def method(self):
        print("B.method")

class C(A):
    def method(self):
        print("C.method")

class D(B, C):
    pass

d = D()
d.method()           # B.method（继承链中第一个找到的）
print(D.__mro__)     # D → B → C → A → object
```

MRO（Method Resolution Order）决定了方法查找顺序，遵循 C3 线性化算法。

### 10.5 魔术方法

```python
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages

    def __str__(self):
        return f"《{self.title}》"

    def __repr__(self):
        return f"Book('{self.title}', {self.pages})"

    def __len__(self):
        return self.pages

    def __eq__(self, other):
        if not isinstance(other, Book):
            return False
        return self.title == other.title and self.pages == other.pages

book = Book("Python 入门", 300)
print(str(book))     # 《Python 入门》
print(repr(book))    # Book('Python 入门', 300)
print(len(book))     # 300
print(book == Book("Python 入门", 300))  # True
```

常用魔术方法：

| 方法 | 说明 |
|------|------|
| `__init__` | 构造方法 |
| `__str__` | `str()` 或 `print()` 调用 |
| `__repr__` | `repr()` 或交互环境显示 |
| `__len__` | `len()` 调用 |
| `__eq__` | `==` 运算符 |
| `__lt__` | `<` 运算符 |
| `__add__` | `+` 运算符 |
| `__getitem__` | `obj[key]` 下标访问 |
| `__call__` | `obj()` 实例作为函数调用 |

### 10.6 `@property` — 属性装饰器

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("温度不能低于绝对零度")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

t = Temperature(25)
print(t.celsius)      # 25（像属性一样访问）
t.celsius = 30        # 走 setter 校验
print(t.fahrenheit)   # 86.0（只读，没有 setter）
```

### 10.7 `@classmethod` 与 `@staticmethod`

```python
class MathUtils:
    @classmethod
    def from_string(cls, text):
        """类方法：用类本身创建实例"""
        nums = [int(x) for x in text.split(",")]
        return cls(nums)

    @staticmethod
    def is_even(n):
        """静态方法：与类无关的工具函数"""
        return n % 2 == 0

    def __init__(self, numbers):
        self.numbers = numbers

# 类方法：通过类调用，自动传入 cls
m = MathUtils.from_string("1,2,3,4,5")
print(m.numbers)  # [1, 2, 3, 4, 5]

# 静态方法：类似普通函数，只是放在类命名空间中
print(MathUtils.is_even(4))  # True
```

| 装饰器 | 第一个参数 | 访问类/实例属性 | 调用方式 |
|--------|-----------|----------------|---------|
| 实例方法 | `self` | 都可以 | `obj.method()` |
| `@classmethod` | `cls` | 只能访问类属性 | `cls.method()` 或 `obj.method()` |
| `@staticmethod` | 无 | 不能访问 | `cls.method()` 或 `obj.method()` |

### 10.8 私有属性

Python 没有真正的私有，通过命名约定实现：

```python
class Person:
    def __init__(self, name):
        self._name = name       # 约定为"受保护"，外部不应直接访问
        self.__secret = "秘密"   # 名称改写（name mangling）

    def get_name(self):
        return self._name

p = Person("Alice")
print(p._name)        # 技术上仍可访问，但约定上不应这么做
# print(p.__secret)   # AttributeError！名称改写为 _Person__secret
print(p._Person__secret)  # '秘密'（虽然能访问，但不要这么做）
```

- `_name`：约定为内部使用（PEP 8）
- `__name`：Python 解释器进行名称改写，避免子类意外覆盖

---

## 11. 模块与包

### 11.1 为什么需要模块化

```python
# bad.py — 所有代码写在一个文件里（500 行...）

# good/
# project/
# ├── main.py
# ├── utils.py
# ├── models.py
# └── config.py
```

- 代码复用：一个函数写一次，多处调用
- 职责分离：每个文件只做一件事
- 易于测试：可以单独测试每个模块

### 11.2 模块与导入

一个 `.py` 文件就是一个模块，模块名就是文件名（不含 `.py`）。

```python
# 方式 1：导入整个模块
import math
print(math.sqrt(16))

# 方式 2：导入特定成员
from math import sqrt, pi
print(sqrt(16))

# 方式 3：别名
import math as m
print(m.sqrt(16))

from math import sqrt as square_root
```

#### `__name__` 与 `__main__`

```python
# utils.py
def greet(name):
    return f"Hello, {name}"

if __name__ == "__main__":
    # 只有直接运行此文件时才执行
    print(greet("World"))
```

- `python utils.py` → `__name__` == `"__main__"`
- `import utils` → `__name__` == `"utils"`

### 11.3 包（Package）

包是包含 `__init__.py` 的目录（Python 3.3+ 可省略）。

```
project/
├── __init__.py
├── main.py
├── utils/
│   ├── __init__.py
│   ├── file_helper.py
│   └── string_helper.py
└── models/
    ├── __init__.py
    └── todo.py
```

```python
# main.py
from utils.file_helper import read_file
from models.todo import Todo
```

### 11.4 模块搜索路径

```python
import sys
print(sys.path)  # Python 搜索模块的路径列表
```

搜索顺序：
1. 当前脚本所在目录
2. `PYTHONPATH` 环境变量
3. Python 标准库目录
4. site-packages（第三方库）

### 11.5 依赖管理

#### 标准库 vs 第三方库

| 类型 | 来源 | 示例 |
|------|------|------|
| 标准库 | 安装 Python 自带 | `os` `sys` `json` `math` |
| 第三方库 | 需额外安装 | `requests` `flask` `pandas` |

#### pip 常用命令

```bash
pip install requests          # 安装包
pip install requests==2.28.0  # 指定版本
pip uninstall requests        # 卸载
pip list                      # 列出已安装包
pip show requests             # 查看包信息
```

#### requirements.txt

```
# requirements.txt
requests==2.28.0
flask==2.3.0
pandas>=1.5.0
```

```bash
pip install -r requirements.txt
```

#### 标准项目目录结构

```
project/
├── README.md
├── requirements.txt
├── main.py                  # 程序入口
├── config.py                # 配置文件
├── utils/                   # 工具模块
│   ├── __init__.py
│   └── helpers.py
├── models/                  # 数据模型
│   ├── __init__.py
│   └── todo.py
├── data/                    # 数据文件
│   └── todos.json
└── tests/                   # 测试
    └── test_todo.py
```

---

## 12. 文件操作

### 12.1 打开与关闭文件

```python
# 基础方式（需要手动关闭）
f = open("hello.txt", "r", encoding="utf-8")
content = f.read()
f.close()  # 容易忘记！

# 推荐方式（自动关闭）
with open("hello.txt", "r", encoding="utf-8") as f:
    content = f.read()
# 出了 with 块，文件自动关闭
```

### 12.2 文件打开模式

| 模式 | 说明 |
|------|------|
| `"r"` | 只读（默认），文件不存在报错 |
| `"w"` | 写入，覆盖原内容，不存在则创建 |
| `"a"` | 追加，在末尾写入 |
| `"x"` | 独占创建，文件已存在报错 |
| `"b"` | 二进制模式（如 `"rb"` `"wb"`） |
| `"+"` | 读写（如 `"r+"` `"w+"`） |

### 12.3 读取文件

```python
# 一次读取全部
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()            # 整个文件作为字符串

# 按行读取列表
with open("data.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()         # ["line1\n", "line2\n", ...]

# 逐行读取（推荐，省内存）
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        line = line.strip()       # 去掉末尾换行
        print(line)
```

### 12.4 写入文件

```python
# 覆盖写入
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("Hello, World!\n")
    f.write("第二行\n")

# 追加写入
with open("output.txt", "a", encoding="utf-8") as f:
    f.write("追加的内容\n")
```

### 12.5 文件路径处理

```python
import os
from pathlib import Path

# os.path 方式（传统）
os.path.join("data", "todos.json")        # data/todos.json
os.path.exists("data/todos.json")         # True/False
os.path.dirname("/a/b/c.txt")             # /a/b
os.path.basename("/a/b/c.txt")            # c.txt
os.path.splitext("file.txt")              # ('file', '.txt')

# pathlib 方式（现代，推荐）
p = Path("data/todos.json")
p.parent              # Path("data")
p.name                # "todos.json"
p.stem                # "todos"
p.suffix              # ".json"
p.exists()            # True/False
p.mkdir(parents=True, exist_ok=True)  # 创建目录
```

### 12.6 JSON 文件读写

```python
import json

# 写入 JSON
data = {"name": "Alice", "age": 25, "scores": [88, 92, 76]}

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
    print(loaded)  # {"name": "Alice", "age": 25, "scores": [88, 92, 76]}
```

---

## 13. 异常处理

### 13.1 基本结构

```python
try:
    num = int(input("请输入数字："))
    result = 10 / num
    print(f"结果是：{result}")
except ValueError:
    print("输入的不是有效数字！")
except ZeroDivisionError:
    print("不能除以零！")
except Exception as e:
    print(f"未知错误：{e}")
else:
    print("没有异常发生")    # 可选
finally:
    print("无论如何都会执行")  # 可选
```

### 13.2 常用异常类型

| 异常 | 触发场景 |
|------|---------|
| `ValueError` | 类型正确但值不合法（如 `int("abc")`）|
| `TypeError` | 类型不匹配（如 `"1" + 1`）|
| `IndexError` | 索引越界（如 `lst[100]`）|
| `KeyError` | 字典键不存在 |
| `FileNotFoundError` | 文件不存在 |
| `ZeroDivisionError` | 除以零 |
| `AttributeError` | 对象没有该属性 |

### 13.3 异常与文件结合

```python
def read_todos(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return f.readlines()
    except FileNotFoundError:
        print(f"文件 {filepath} 不存在，返回空列表")
        return []
    except PermissionError:
        print(f"没有权限读取 {filepath}")
        return []
```

### 13.4 自定义异常

```python
class TodoError(Exception):
    """TODO 管理相关异常"""
    pass

class TodoNotFoundError(TodoError):
    """TODO 不存在"""
    pass

def find_todo(todos, todo_id):
    for todo in todos:
        if todo["id"] == todo_id:
            return todo
    raise TodoNotFoundError(f"ID {todo_id} 不存在")
```
