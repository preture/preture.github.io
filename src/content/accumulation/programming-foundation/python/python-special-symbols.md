# Python 3 特殊符号完全指南

本文档系统梳理 Python 3 中的特殊符号、运算符和语法标记，每个都配有代码示例。

## 目录

- [1. 算术运算符](#1-算术运算符)
- [2. 比较运算符](#2-比较运算符)
- [3. 位运算符](#3-位运算符)
- [4. 赋值运算符](#4-赋值运算符)
- [5. 逻辑运算符](#5-逻辑运算符)
- [6. 成员/身份运算符](#6-成员身份运算符)
- [7. 单例对象](#7-单例对象)
- [8. 符号标记与装饰器](#8-符号标记与装饰器)
- [9. 字符串前缀](#9-字符串前缀)
- [10. 函数/类相关符号](#10-函数类相关符号)
- [11. 变量命名约定](#11-变量命名约定)
- [12. 解包与可变参数](#12-解包与可变参数)
- [13. 切片操作符](#13-切片操作符)
- [14. 推导式与生成器](#14-推导式与生成器)
- [15. 类型注解](#15-类型注解)
- [16. 海象运算符 (:=)](#16-海象运算符-)
- [17. 装饰器 (@)](#17-装饰器-)
- [18. Ellipsis (...)](#18-ellipsis-)
- [19. 行续符 (\)](#19-行续符-)
- [20. 下划线 (_) 的多种用法](#20-下划线-的多种用法)
- [21. 矩阵乘法 (@)](#21-矩阵乘法-)
- [22. NotImplemented 单例](#22-notimplemented-单例)

---

## 1. 算术运算符

### `+` 加法 / 字符串连接
```python
# 数值加法
print(1 + 2)          # 3

# 字符串连接
print("Hello" + " " + "World")  # Hello World

# 列表拼接
print([1, 2] + [3, 4])  # [1, 2, 3, 4]
```

### `-` 减法
```python
print(5 - 3)          # 2
```

### `*` 乘法 / 重复
```python
# 数值乘法
print(3 * 4)          # 12

# 字符串重复
print("Ha" * 3)       # HaHaHa

# 列表重复
print([1, 2] * 2)     # [1, 2, 1, 2]
```

### `/` 除法（浮点数）
```python
print(7 / 2)          # 3.5
print(8 / 4)          # 2.0
```

### `//` 整数除法（地板除）
```python
print(7 // 2)         # 3（向下取整）
print(-7 // 2)        # -4（向下取整）
```

### `%` 取模（求余）
```python
print(7 % 2)          # 1
print(10 % 3)         # 1
```

### `**` 幂运算
```python
print(2 ** 3)         # 8
print(4 ** 0.5)       # 2.0（平方根）
```

---

## 2. 比较运算符

### `==` 等于
```python
print(1 == 1)         # True
print(1 == "1")       # False（类型不同）
```

### `!=` 不等于
```python
print(1 != 2)         # True
print(1 != 1)         # False
```

### `>` 大于 / `<` 小于
```python
print(5 > 3)          # True
print(2 < 1)          # False
```

### `>=` 大于等于 / `<=` 小于等于
```python
print(5 >= 5)         # True
print(3 <= 2)         # False
```

---

## 3. 位运算符

### `&` 按位与
```python
# 5 = 0b0101, 3 = 0b0011
print(5 & 3)          # 1 (0b0001)
```

### `|` 按位或
```python
print(5 | 3)          # 7 (0b0111)
```

### `^` 按位异或
```python
print(5 ^ 3)          # 6 (0b0110)
```

### `~` 按位取反
```python
print(~5)             # -6（~x = -x-1）
```

### `<<` 左移
```python
print(5 << 1)         # 10（相当于乘2）
```

### `>>` 右移
```python
print(5 >> 1)         # 2（相当于整除2）
```

---

## 4. 赋值运算符

### `=` 普通赋值
```python
x = 10
name = "Alice"
```

### 复合赋值运算符
```python
a = 5
a += 2    # a = a + 2，a 变为 7
a -= 1    # a = 6
a *= 2    # a = 12
a /= 3    # a = 4.0
a //= 2   # a = 2.0
a %= 3    # a = 2.0
a **= 2   # a = 4.0
a &= 2    # 按位与赋值
a |= 1    # 按位或赋值
a ^= 3    # 按位异或赋值
a <<= 1   # 左移赋值
a >>= 1   # 右移赋值
```

---

## 5. 逻辑运算符

### `and` 逻辑与
```python
print(True and False)   # False
print(5 > 3 and 2 < 4)  # True
```

### `or` 逻辑或
```python
print(True or False)    # True
print(False or False)   # False
```

### `not` 逻辑非
```python
print(not True)         # False
print(not 0)            # True（0 是假值）
```

---

## 6. 成员/身份运算符

### `in` / `not in` 成员检查
```python
# 列表
print(2 in [1, 2, 3])           # True
print(5 not in [1, 2, 3])       # True

# 字符串
print('a' in 'hello world')     # True

# 字典（检查键）
d = {'name': 'Alice', 'age': 30}
print('name' in d)              # True
```

### `is` / `is not` 身份检查（比较对象是否为同一个）
```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a is b)       # False（不同对象，即使内容相同）
print(a is c)       # True（同一个对象）
print(a is not b)   # True

# None 推荐用 is 检查
x = None
if x is None:
    print("x is None")
```

---

## 7. 单例对象

### `None` 空值
```python
def func():
    pass

result = func()
print(result is None)   # True

# 函数默认参数常用 None
def greet(name=None):
    if name is None:
        print("Hello stranger")
    else:
        print(f"Hello {name}")
```

### `True` / `False` 布尔值
```python
is_active = True
is_deleted = False

print(True + True)      # 2（True 是 1）
print(False * 10)       # 0（False 是 0）
```

### `...` (Ellipsis) 省略号
```python
# 基本属性
print(type(...))        # <class 'ellipsis'>
print(... is Ellipsis)  # True

# NumPy 中的实际应用
import numpy as np
arr = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
print(arr[..., 0])      # 取所有维度的索引 0
# [[1 3]
#  [5 7]]

# FastAPI 中标记必需字段
from pydantic import BaseModel
class Item(BaseModel):
    name: str = ...     # 必需字段
    price: float = ...  # 必需字段
```

### `NotImplemented` 未实现
```python
# 用于二元运算符重载
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y
    
    def __add__(self, other):
        if isinstance(other, Vector):
            return Vector(self.x + other.x, self.y + other.y)
        return NotImplemented  # Python 会尝试反向操作

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2
print(v3.x, v3.y)   # 4 6
```

---

## 8. 符号标记与装饰器

### `@` 装饰器语法糖
```python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"耗时: {time.time() - start:.2f}秒")
        return result
    return wrapper

@timer
def slow_function():
    import time
    time.sleep(1)
    return "完成"

slow_function()  # 输出: 耗时: 1.00秒
```

### `->` 函数返回值注解
```python
def greet(name: str) -> str:
    return f"Hello, {name}"

def divide(a: float, b: float) -> float | None:
    if b == 0:
        return None
    return a / b

print(greet.__annotations__)  # {'name': <class 'str'>, 'return': <class 'str'>}
```

### `:` 类型注解 / 代码块开始
```python
# 变量类型注解
age: int = 25
names: list[str] = ["Alice", "Bob"]

# 字典/列表/集合/生成器推导式中的冒号
d = {x: x**2 for x in range(5)}  # {0:0, 1:1, 2:4, 3:9, 4:16}

# 切片中的冒号
lst = [0, 1, 2, 3, 4, 5]
print(lst[1:4])     # [1, 2, 3]
print(lst[::2])     # [0, 2, 4]
print(lst[::-1])    # [5, 4, 3, 2, 1, 0]
```

---

## 9. 字符串前缀

### `f` 格式化字符串
```python
name = "Alice"
age = 30
print(f"Hello {name}, you are {age} years old")
print(f"2 + 2 = {2 + 2}")           # 可以放表达式
print(f"{3.14159:.2f}")              # 3.14（支持格式说明符）
```

### `r` 原始字符串（不转义）
```python
# 普通字符串：\n 会被转义
print("C:\new\test")    # 输出有多行

# 原始字符串：保持原样
print(r"C:\new\test")   # C:\new\test

# 正则表达式常用
import re
pattern = r"\d+\.\d+"   # 不用写双反斜杠
```

### `b` 字节字符串
```python
# 普通字符串和字节串的区别
text = "Hello"
byte_str = b"Hello"

print(type(text))       # <class 'str'>
print(type(byte_str))   # <class 'bytes'>

# 编码转换
text = "中文"
encoded = text.encode('utf-8')   # b'\xe4\xb8\xad\xe6\x96\x87'
print(encoded)

# 字节串拼接
print(b"Hello" + b" World")  # b'Hello World'
```

### `u` Unicode 字符串（Python 3 中多余，仅作说明）
```python
# Python 3 中字符串默认就是 Unicode
s1 = "Hello"
s2 = u"Hello"   # 和 s1 完全相同，不需要使用
```

---

## 10. 函数/类相关符号

### `/` 仅位置参数分隔符（Python 3.8+）
```python
def func(a, b, /, c, d, *, e, f):
    """a, b 只能位置传递；c, d 位置或关键字；e, f 只能关键字"""
    print(a, b, c, d, e, f)

func(1, 2, 3, 4, e=5, f=6)   # 正确
# func(a=1, b=2, c=3, d=4, e=5, f=6)  # 错误：a,b 不能关键字传递
```

### `*` 强制关键字参数分隔符
```python
def func(a, b, *, c):
    """c 必须使用关键字参数传递"""
    print(a, b, c)

func(1, 2, c=3)     # 正确
# func(1, 2, 3)     # TypeError
```

---

## 11. 变量命名约定

### 单下划线 `_`（详见第20节）

### 双下划线前缀 `__name` 名称修饰
```python
class MyClass:
    def __init__(self):
        self.public = "公开"
        self._protected = "受保护（约定）"
        self.__private = "私有（名称修饰）"
    
    def __private_method(self):
        return "私有方法"

obj = MyClass()
print(obj.public)           # 公开
print(obj._protected)       # 可以访问但不建议
# print(obj.__private)      # AttributeError
print(obj._MyClass__private)  # 实际存储为 _类名__属性名
```

### 双下划线包围 `__name__` 魔术方法
```python
class Person:
    def __init__(self, name):
        self.name = name
    
    def __str__(self):
        return f"Person(name={self.name})"
    
    def __len__(self):
        return len(self.name)

p = Person("Alice")
print(p)        # Person(name=Alice)  （调用 __str__）
print(len(p))   # 5                 （调用 __len__）
```

---

## 12. 解包与可变参数

### `*` 用于序列解包
```python
# 列表解包
a, *b, c = [1, 2, 3, 4, 5]
print(a)    # 1
print(b)    # [2, 3, 4]
print(c)    # 5

# 函数调用时解包列表/元组
def add(a, b, c):
    return a + b + c

nums = [1, 2, 3]
print(add(*nums))   # 6

# 合并列表
lst1 = [1, 2]
lst2 = [3, 4]
combined = [*lst1, *lst2]
print(combined)     # [1, 2, 3, 4]
```

### `*args` 可变位置参数
```python
def sum_all(*args):
    """接收任意多个位置参数"""
    return sum(args)

print(sum_all(1, 2, 3, 4, 5))   # 15
print(sum_all(10, 20))           # 30

# 实际应用：装饰器
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}，参数: {args}, {kwargs}")
        return func(*args, **kwargs)
    return wrapper
```

### `**` 用于字典解包
```python
# 合并字典
d1 = {"a": 1, "b": 2}
d2 = {"c": 3, "d": 4}
merged = {**d1, **d2}
print(merged)   # {'a': 1, 'b': 2, 'c': 3, 'd': 4}

# 函数调用时解包字典
def greet(name, age):
    print(f"{name} is {age} years old")

data = {"name": "Alice", "age": 30}
greet(**data)   # Alice is 30 years old
```

### `**kwargs` 可变关键字参数
```python
def print_info(**kwargs):
    """接收任意多个关键字参数"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="Alice", age=30, city="New York")
# name: Alice
# age: 30
# city: New York

# 实际应用：函数参数转发
def wrapper(func, *args, **kwargs):
    print("Before call")
    result = func(*args, **kwargs)
    print("After call")
    return result
```

---

## 13. 切片操作符

### `:` 切片操作
```python
lst = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

# 基本切片 [start:stop:step]
print(lst[2:7])     # [2, 3, 4, 5, 6]（stop 不包含）
print(lst[:5])      # [0, 1, 2, 3, 4]（从头开始）
print(lst[5:])      # [5, 6, 7, 8, 9]（到最后）
print(lst[::2])     # [0, 2, 4, 6, 8]（步长2）
print(lst[::-1])    # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]（反转）

# 字符串切片
text = "Hello World"
print(text[6:])     # "World"
print(text[:5])     # "Hello"
```

### `...` 省略号切片（NumPy/PyTorch）
```python
import numpy as np

# 三维数组
arr = np.random.rand(2, 3, 4)

# ... 代表"所有前面的维度"
print(arr[..., 0].shape)   # (2, 3) - 最后一维取索引0
print(arr[0, ...].shape)   # (3, 4) - 第一维取索引0
print(arr[..., 1:3].shape) # (2, 3, 2) - 最后一维切片

# 多维数组操作
data = np.array([
    [[1, 2], [3, 4]],
    [[5, 6], [7, 8]]
])
print(data[..., 0])   # [[1, 3], [5, 7]] 取所有元素的第一个值
```

---

## 14. 推导式与生成器

### `[... for ... in ...]` 列表推导式
```python
# 基本语法
squares = [x**2 for x in range(5)]
print(squares)          # [0, 1, 4, 9, 16]

# 带条件
evens = [x for x in range(10) if x % 2 == 0]
print(evens)            # [0, 2, 4, 6, 8]

# 嵌套循环
pairs = [(x, y) for x in range(2) for y in range(2)]
print(pairs)            # [(0, 0), (0, 1), (1, 0), (1, 1)]
```

### `{... for ... in ...}` 集合推导式
```python
unique_squares = {x**2 for x in [-2, -1, 0, 1, 2]}
print(unique_squares)   # {0, 1, 4}
```

### `{key: value for ... in ...}` 字典推导式
```python
square_dict = {x: x**2 for x in range(5)}
print(square_dict)      # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 反转字典
original = {'a': 1, 'b': 2, 'c': 3}
reversed_dict = {v: k for k, v in original.items()}
print(reversed_dict)    # {1: 'a', 2: 'b', 3: 'c'}
```

### `(... for ... in ...)` 生成器表达式
```python
# 惰性计算，节省内存
sum_of_squares = sum(x**2 for x in range(1000000))
# 上面不会创建完整的列表，而是逐个生成

gen = (x**2 for x in range(5))
print(next(gen))    # 0
print(next(gen))    # 1
print(next(gen))    # 4
```

---

## 15. 类型注解

### `: type` 变量注解
```python
# 简单类型
name: str = "Alice"
age: int = 30
price: float = 19.99
is_active: bool = True

# 容器类型
from typing import List, Dict, Optional, Union

names: List[str] = ["Alice", "Bob"]
scores: Dict[str, int] = {"Alice": 95, "Bob": 87}
maybe_number: Optional[int] = None  # int 或 None
id_or_name: Union[int, str] = 123   # int 或 str

# Python 3.9+ 直接使用内置类型
names: list[str] = ["Alice", "Bob"]
scores: dict[str, int] = {"Alice": 95}
```

### `-> type` 返回值注解
```python
def add(x: int, y: int) -> int:
    return x + y

def process(data: list[str]) -> dict[str, int]:
    return {item: len(item) for item in data}

# 复杂类型注解
from typing import Callable

def executor(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

result = executor(lambda x, y: x * y, 5, 3)  # 15
```

### `|` 联合类型（Python 3.10+）
```python
# 旧写法
def parse(value: Union[int, str]) -> int:
    return int(value)

# 新写法
def parse(value: int | str) -> int:
    return int(value)

# 可选参数
def greet(name: str | None = None) -> str:
    if name is None:
        return "Hello stranger"
    return f"Hello {name}"
```

---

## 16. 海象运算符 `:=`

Python 3.8+ 引入，在表达式中完成赋值并使用。

```python
# 传统写法
data = input("> ")
while data != "quit":
    print(f"You said: {data}")
    data = input("> ")

# 海象写法
while (data := input("> ")) != "quit":
    print(f"You said: {data}")

# 列表推导中使用
values = [1, 2, 3, 4, 5]
squared_evens = [y for x in values if (y := x**2) % 2 == 0]
print(squared_evens)    # [4, 16]

# 正则匹配
import re
text = "My phone: 123-456-7890"
if match := re.search(r'\d{3}-\d{3}-\d{4}', text):
    print(f"Found: {match.group()}")

# 避免重复计算
data = [5, 3, 8, 1, 9]
if (n := len(data)) > 5:
    print(f"List is too long ({n} elements)")
else:
    print(f"List has {n} elements")
```

---

## 17. 装饰器 `@`

```python
# 基本装饰器
def uppercase(func):
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        return result.upper()
    return wrapper

@uppercase
def greet(name):
    return f"Hello, {name}"

print(greet("Alice"))   # HELLO, ALICE

# 带参数的装饰器
def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def say_hello():
    return "Hello"

print(say_hello())      # ['Hello', 'Hello', 'Hello']

# 类装饰器
class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0
    
    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"调用 {self.count} 次")
        return self.func(*args, **kwargs)

@CountCalls
def test():
    print("执行函数")

test()  # 调用 1 次 \n 执行函数
test()  # 调用 2 次 \n 执行函数
```

---

## 18. Ellipsis `...`

```python
# 1. 作为占位符（比 pass 更有语义）
def not_implemented_yet():
    ...

def stub_function():
    ...  # 表示"稍后实现"

# 2. NumPy 多维切片
import numpy as np
arr = np.random.rand(3, 4, 5)
print(arr[..., 0].shape)   # (3, 4) - 最后一维取索引0
print(arr[0, ...].shape)   # (4, 5) - 第一维取索引0

# 3. FastAPI/Pydantic 标记必需字段
from pydantic import BaseModel
class User(BaseModel):
    username: str = ...
    email: str = ...
    age: int = 18  # 可选，有默认值

# 4. 类型注解
from typing import Tuple, Callable
# 任意长度的整数元组
coordinates: Tuple[int, ...] = (1, 2, 3, 4)
# 任意参数的函数
def apply(func: Callable[..., int], *args) -> int:
    return func(*args)

# 5. 自定义类中使用
class MyArray:
    def __getitem__(self, key):
        if key is Ellipsis:
            return "Received ..."
        return key

obj = MyArray()
print(obj[...])   # Received ...
```

---

## 19. 行续符 `\`

```python
# 长表达式换行
total = 1 + 2 + 3 + 4 + 5 + \
        6 + 7 + 8 + 9 + 10

# 长条件判断
if (very_long_condition_one and 
    very_long_condition_two and 
    very_long_condition_three):
    print("条件满足")

# 字符串换行（更好的方式是用括号）
long_string = "This is a very long string that I want to " \
              "continue on the next line for readability"

# 括号内的换行不需要 \（推荐）
result = (1 + 2 + 3 + 4 + 5 + 
          6 + 7 + 8 + 9 + 10)

# 列表、字典内换行不需要 \
my_list = [1, 2, 3, 4, 5,
           6, 7, 8, 9, 10]
```

---

## 20. 下划线 `_` 的多种用法

### 单下划线 `_` - 忽略值
```python
# 忽略不需要的值
for _ in range(5):
    print("Hello")  # 打印5次

# 解包时忽略元素
a, _, b = (1, 2, 3)
print(a, b)         # 1 3

# 忽略函数返回值
_, error = some_function()  # 只关心错误信息
```

### 单下划线 `_` - 交互式环境
```python
# Python REPL 中
>>> 5 + 3
8
>>> _ + 2
10
>>> _ * 2
20
```

### 单下划线 `_` - 国际化翻译
```python
# gettext 常用
from gettext import gettext as _
print(_("Hello World"))  # 会查找翻译
```

### 单下划线前缀 `_name` - 保护约定
```python
class MyClass:
    def __init__(self):
        self.public = "公开"        # 公开属性
        self._protected = "保护"    # 约定：不应直接访问
        self._internal_func()       # 内部使用

    def _internal_func(self):
        return "内部方法"

# from module import * 不会导入 _protected
```

### 双下划线前缀 `__name` - 名称修饰
```python
class Parent:
    def __init__(self):
        self.__secret = "秘密"

class Child(Parent):
    def show(self):
        # print(self.__secret)  # AttributeError
        print(self._Parent__secret)  # 通过名称修饰访问

obj = Child()
obj.show()  # 秘密
```

### 双下划线包围 `__name__` - 特殊方法
```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
    
    def __str__(self):
        return f"{self.title} by {self.author}"
    
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}')"
    
    def __len__(self):
        return len(self.title)
    
    def __eq__(self, other):
        return self.title == other.title

book = Book("1984", "Orwell")
print(str(book))    # 调用 __str__
print(len(book))    # 调用 __len__
```

---

## 21. 矩阵乘法 `@`

Python 3.5+ 引入，用于矩阵乘法。

```python
# NumPy 中使用
import numpy as np

A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# 矩阵乘法
C = A @ B
print(C)
# [[19 22]
#  [43 50]]

# 与逐元素乘法的区别
elementwise = A * B
print(elementwise)
# [[ 5 12]
#  [21 32]]

# 向量点积
v = np.array([1, 2, 3])
w = np.array([4, 5, 6])
dot_product = v @ w  # 32 (1*4 + 2*5 + 3*6)

# 自定义类中重载
class Matrix:
    def __init__(self, data):
        self.data = data
    
    def __matmul__(self, other):
        # 实现矩阵乘法
        result = []
        for i in range(len(self.data)):
            row = []
            for j in range(len(other.data[0])):
                val = sum(self.data[i][k] * other.data[k][j] 
                          for k in range(len(self.data[0])))
                row.append(val)
            result.append(row)
        return Matrix(result)
    
    def __repr__(self):
        return f"Matrix({self.data})"

m1 = Matrix([[1, 2], [3, 4]])
m2 = Matrix([[5, 6], [7, 8]])
print(m1 @ m2)  # Matrix([[19, 22], [43, 50]])
```

---

## 22. `NotImplemented` 单例

`NotImplemented` 是一个特殊的单例值，用于二元运算符重载时表示"这个操作我没有实现"。

```python
# 基本用法
class Number:
    def __init__(self, value):
        self.value = value
    
    def __add__(self, other):
        if isinstance(other, Number):
            return Number(self.value + other.value)
        return NotImplemented  # 尝试反向操作
    
    def __radd__(self, other):
        # 当 left.__add__ 返回 NotImplemented 时调用
        if isinstance(other, (int, float)):
            return Number(other + self.value)
        return NotImplemented
    
    def __repr__(self):
        return f"Number({self.value})"

# 测试
n = Number(5)
print(n + Number(3))    # Number(8) - 使用 __add__
print(n + 10)           # Number(15) - 触发 __radd__
print(20 + n)           # Number(25) - 触发 __radd__
# print(n + "hello")    # TypeError - 两边都不支持

# NotImplemented vs NotImplementedError
class Example:
    def __add__(self, other):
        # NotImplemented 是值，表示操作不支持
        return NotImplemented
    
    def unsupported_method(self):
        # NotImplementedError 是异常，用于抽象方法
        raise NotImplementedError("Subclass must implement")

# 在类型注解中使用
from typing import Any, NoReturn

def not_implemented_func() -> NoReturn:
    raise NotImplementedError("Must be implemented")
```

---

## 总结速查表

| 符号 | 主要用途 |
|------|----------|
| `+ - * / // % **` | 算术运算 |
| `== != > < >= <=` | 比较运算 |
| `& \| ^ ~ << >>` | 位运算 |
| `and or not` | 逻辑运算 |
| `in not in` | 成员检查 |
| `is is not` | 身份检查 |
| `= += -=` 等 | 赋值/复合赋值 |
| `:=` | 海象运算符（赋值表达式） |
| `@` | 装饰器 / 矩阵乘法 |
| `*` | 乘法 / 解包 / 可变参数 |
| `**` | 幂运算 / 字典解包 / 可变关键字参数 |
| `/` | 仅位置参数分隔符 |
| `->` | 返回值类型注解 |
| `:` | 类型注解 / 切片 / 代码块开始 |
| `...` | Ellipsis 省略号 |
| `_` | 忽略值 / 翻译 / 私有约定 |
| `__name__` | 魔术方法 |
| `__name` | 名称修饰（私有属性）
| `\` | 行续符 |
| `f""` | 格式化字符串 |
| `r""` | 原始字符串 |
| `b""` | 字节字符串 |
| `#` | 注释 |
| `None` | 空值单例 |
| `NotImplemented` | 未实现单例 |

---

## 附录：运算符优先级表

从高到低排列：

| 优先级 | 运算符 | 描述 |
|--------|--------|------|
| 1 | `(expressions...)` | 括号表达式 |
| 2 | `x[index]`, `x[index:index]` | 索引、切片 |
| 3 | `x.attribute` | 属性访问 |
| 4 | `x(arguments...)` | 函数调用 |
| 5 | `await x` | await 表达式 |
| 6 | `**` | 幂运算 |
| 7 | `+x`, `-x`, `~x` | 正、负、按位取反 |
| 8 | `*`, `@`, `/`, `//`, `%` | 乘、矩阵乘、除、整除、取模 |
| 9 | `+`, `-` | 加、减 |
| 10 | `<<`, `>>` | 移位 |
| 11 | `&` | 按位与 |
| 12 | `^` | 按位异或 |
| 13 | `\|` | 按位或 |
| 14 | `in`, `not in`, `is`, `is not`, `<`, `<=`, `>`, `>=`, `!=`, `==` | 比较运算 |
| 15 | `not x` | 逻辑非 |
| 16 | `and` | 逻辑与 |
| 17 | `or` | 逻辑或 |
| 18 | `:=` | 海象运算符（赋值表达式） |
| 19 | `if...else` | 条件表达式（三元运算符） |
| 20 | `lambda` | lambda 表达式 |

---

## 附录：常用转义字符

| 转义序列 | 含义 |
|----------|------|
| `\n` | 换行符 |
| `\t` | 制表符（Tab） |
| `\r` | 回车符 |
| `\\` | 反斜杠本身 |
| `\'` | 单引号 |
| `\"` | 双引号 |
| `\b` | 退格符 |
| `\f` | 换页符 |
| `\v` | 垂直制表符 |
| `\0` | 空字符（NULL） |
| `\xhh` | 十六进制字符（如 `\x0a` 表示换行） |
| `\uhhhh` | 16 位 Unicode 字符 |
| `\Uhhhhhhhh` | 32 位 Unicode 字符 |

```python
# 转义示例
print("Hello\nWorld")   # Hello\nWorld（换行）
print("Tab\tseparated") # Tab    separated
print("C:\\Program Files")  # C:\Program Files
print('It\'s ok')       # It's ok
print("He said \"Hi\"") # He said "Hi"
```

---

## 附录：格式化字符串迷你语言速查

### f-string 格式化语法

```python
name = "Alice"
age = 30
pi = 3.1415926

# 基本格式化
print(f"{name:10}")      # "Alice     "（左对齐，宽度10）
print(f"{name:>10}")     # "     Alice"（右对齐）
print(f"{name:^10}")     # "  Alice   "（居中对齐）

# 数字格式化
print(f"{pi:.2f}")       # 3.14（保留2位小数）
print(f"{pi:.0f}")       # 3（保留0位小数）
print(f"{123456:,}")     # 123,456（千位分隔符）
print(f"{0.25:.1%}")     # 25.0%（百分比）

# 进制转换
print(f"{255:b}")        # 11111111（二进制）
print(f"{255:o}")        # 377（八进制）
print(f"{255:x}")        # ff（十六进制小写）
print(f"{255:X}")        # FF（十六进制大写）

# 对齐填充
print(f"{name:_<10}")    # "Alice_____"（下划线填充左对齐）
print(f"{name:_>10}")    # "_____Alice"
print(f"{name:_^10}")    # "__Alice___"

# 符号显示
print(f"{123:+}")        # +123
print(f"{-123:+}")       # -123
print(f"{123: }")        # " 123"（空格表示正数前加空格）
```

---

## 参考资料

- [Python 官方文档](https://docs.python.org/3/)
- [PEP 8 - Python 代码风格指南](https://www.python.org/dev/peps/pep-0008/)
- [PEP 3107 - 函数注解](https://www.python.org/dev/peps/pep-3107/)
- [PEP 572 - 海象运算符](https://www.python.org/dev/peps/pep-0572/)
- [PEP 465 - 矩阵乘法运算符 @](https://www.python.org/dev/peps/pep-0465/)
- [PEP 570 - 仅位置参数](https://www.python.org/dev/peps/pep-0570/)
- [PEP 604 - 联合类型 `X | Y`](https://www.python.org/dev/peps/pep-0604/)

---

## 版本说明

本文档涵盖 Python 3.8 至 3.11 的主要特性。

| 符号/语法 | 引入版本 |
|-----------|----------|
| 海象运算符 `:=` | Python 3.8 |
| 仅位置参数 `/` | Python 3.8 |
| 联合类型 `\|` | Python 3.10 |
| 矩阵乘法 `@` | Python 3.5 |
| `...` (Ellipsis) | Python 3.0（但 NumPy 使其广泛使用） |
| 字典解包 `{**d1, **d2}` | Python 3.5 |
| `f-string` | Python 3.6 |

---