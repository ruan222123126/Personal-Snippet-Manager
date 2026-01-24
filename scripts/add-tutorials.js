import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 教学说明内容
const tutorials = {
  // 1. TypeScript Interface
  'cmkruieiq003gda85hnlrhm22': `# TypeScript Interface（接口）详解

## 什么是 Interface？

Interface（接口）是 TypeScript 中用于定义对象结构的强大工具。它描述了对象应该具有的属性、方法及其类型。

## 基本语法

\`\`\`typescript
interface Obj {
  Name: string;
  size: string;
  AnyElse: number;
}
\`\`\`

## 属性说明

- **Name: string** - 定义一个字符串类型的属性
- **size: string** - 定义尺寸属性
- **AnyElse: number** - 定义一个数字类型的属性

## 使用示例

\`\`\`typescript
// 创建符合接口的对象
const myObj: Obj = {
  Name: "示例对象",
  size: "large",
  AnyElse: 42
};
\`\`\`

## 可选属性

可以使用 \`?\` 标记可选属性：

\`\`\`typescript
interface User {
  name: string;
  age?: number;  // 可选属性
}
\`\`\`

## 只读属性

使用 \`readonly\` 关键字：

\`\`\`typescript
interface Config {
  readonly id: number;
  name: string;
}
\`\`\`

## 最佳实践

1. 使用 PascalCase 命名接口
2. 保持接口简洁，遵循单一职责原则
3. 优先使用 interface 而非 type（当定义对象结构时）`,

  // 2. 虚拟环境管理
  'cmkru2w7w0039da85m1tjojub': `# Python 虚拟环境管理

## 为什么需要虚拟环境？

虚拟环境可以为每个项目创建独立的 Python 环境，避免不同项目之间的依赖冲突。

## venv 使用方法

### 创建虚拟环境

\`\`\`bash
python -m venv myenv
\`\`\`

这会在当前目录创建一个 \`myenv\` 文件夹，包含独立的 Python 环境。

### 激活虚拟环境

**Windows:**
\`\`\`bash
myenv\\Scripts\\activate
\`\`\`

**Linux/Mac:**
\`\`\`bash
source myenv/bin/activate
\`\`\`

激活后，命令行提示符会显示环境名称，如 \`(myenv)\`。

### 退出虚拟环境

\`\`\`bash
deactivate
\`\`\`

## 依赖管理

### 导出依赖列表

\`\`\`bash
pip freeze > requirements.txt
\`\`\`

### 安装依赖

\`\`\`bash
pip install -r requirements.txt
\`\`\`

## pipenv（推荐）

pipenv 是更强大的包管理工具，自动管理虚拟环境和依赖文件。

### 安装 pipenv

\`\`\`bash
pip install pipenv
\`\`\`

### 使用 pipenv

\`\`\`bash
# 创建虚拟环境并安装包
pipenv install requests

# 激活虚拟环境
pipenv shell

# 运行命令
pipenv run python script.py
\`\`\`

## 最佳实践

1. 每个项目使用独立的虚拟环境
2. 将 \`venv\` 或 \`env\` 文件夹添加到 \`.gitignore\`
3. 提交 \`requirements.txt\` 或 \`Pipfile\` 到版本控制
4. 定期更新依赖包`,

  // 3. 日期时间处理
  'cmkru2w04002zda85m8mhq0dc': `# Python 日期时间处理

## datetime 模块

Python 的 \`datetime\` 模块提供了丰富的日期时间处理功能。

## 获取当前时间

\`\`\`python
from datetime import datetime

now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))
# 输出: 2024-01-01 12:30:45
\`\`\`

### 常用格式化符号

- %Y - 四位年份
- %m - 月份 (01-12)
- %d - 日期 (01-31)
- %H - 小时 (00-23)
- %M - 分钟 (00-59)
- %S - 秒 (00-59)

## 创建指定日期

\`\`\`python
date = datetime(2024, 1, 1, 12, 0)
\`\`\`

## 时间运算

使用 \`timedelta\` 进行时间加减：

\`\`\`python
from datetime import timedelta

tomorrow = now + timedelta(days=1)
week_ago = now - timedelta(weeks=1)
hour_later = now + timedelta(hours=1)
\`\`\`

## 时间差计算

\`\`\`python
date1 = datetime(2024, 1, 1)
date2 = datetime(2024, 1, 10)

diff = date2 - date1
print(f"相差 {diff.days} 天")  # 输出: 相差 9 天
\`\`\`

## 解析字符串

### 使用 strptime

\`\`\`python
str_date = "2024-01-01"
parsed_date = datetime.strptime(str_date, "%Y-%m-%d")
\`\`\`

### 使用 dateutil（更灵活）

\`\`\`python
from dateutil import parser

flexible_date = parser.parse("January 1, 2024")
flexible_date = parser.parse("2024-01-01")
flexible_date = parser.parse("01/01/2024")
\`\`\`

安装 dateutil：
\`\`\`bash
pip install python-dateutil
\`\`\`

## 时区处理

\`\`\`python
from datetime import timezone
import pytz  # 需要安装: pip install pytz

# UTC 时间
utc_now = datetime.now(timezone.utc)

# 转换时区
tz = pytz.timezone('Asia/Shanghai')
local_time = utc_now.astimezone(tz)
\`\`\`

## 实用技巧

1. 使用 \`datetime.date()\` 处理只有日期的情景
2. 使用 \`datetime.time()\` 处理只有时间的情景
3. 时间比较可以直接使用 \`<\`, \`>\`, \`==\` 等运算符`,

  // 4. 字符串处理
  'cmkru2vsh002pda85yh4hqkp2': `# Python 字符串处理

## 字符串格式化

### f-string（推荐）

\`\`\`python
name = "Alice"
age = 25
print(f"我的名字是 {name}，今年 {age} 岁")
\`\`\`

f-string 支持表达式：

\`\`\`python
print(f"明年 {age + 1} 岁")
print(f"姓名: {name:>10}")  # 右对齐，宽度10
\`\`\`

### 其他格式化方法

\`\`\`python
# format() 方法
"我的名字是 {}".format(name)

# % 操作符（旧式）
"我的名字是 %s" % name
\`\`\`

## 常用字符串方法

\`\`\`python
text = "Hello, World!"

# 大小写转换
text.lower()      # "hello, world!" - 转小写
text.upper()      # "HELLO, WORLD!" - 转大写
text.title()      # "Hello, World!" - 标题格式
text.capitalize() # "Hello, world!" - 首字母大写

# 去除空白
text.strip()      # 去除首尾空白
text.lstrip()     # 去除左侧空白
text.rstrip()     # 去除右侧空白

# 查找和替换
text.find("World")      # 返回位置，找不到返回 -1
text.index("World")     # 返回位置，找不到抛出异常
text.replace("World", "Python")  # 替换

# 分割和连接
text.split(',')   # 按逗号分割成列表
'-'.join(['a', 'b', 'c'])  # 连接成 "a-b-c"
\`\`\`

## 正则表达式

### 基本匹配

\`\`\`python
import re

email = "user@example.com"
pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'

if re.match(pattern, email):
    print("有效的邮箱地址")
\`\`\`

### 常用正则方法

\`\`\`python
# 搜索
re.search(r'\\d+', 'abc123def')  # 搜索第一个匹配

# 查找所有
re.findall(r'\\d+', 'abc123def456')  # ['123', '456']

# 替换
re.sub(r'\\d+', 'X', 'abc123def')  # "abcXdef"
\`\`\`

## 字符串拼接性能

\`\`\`python
# 慢速（循环中拼接）
result = ""
for s in list_of_strings:
    result += s  # 每次创建新对象

# 快速（使用 join）
result = ''.join(list_of_strings)
\`\`\`

## 实用技巧

1. 使用三引号创建多行字符串
2. 原始字符串（r-string）避免转义：\`r"C:\\\\path"\`
3. 使用 \`in\` 关键字检查子串`,

  // 5. 上下文管理器
  'cmkru2vjv002fda85as00kxjt': `# Python 上下文管理器

## 什么是上下文管理器？

上下文管理器用于管理资源，确保资源的正确获取和释放。最常见的例子是 \`with\` 语句打开文件。

## with 语句的好处

\`\`\`python
# 不使用 with（可能出问题）
f = open('file.txt', 'r')
content = f.read()
# 如果这里出错，文件可能不会关闭
f.close()

# 使用 with（自动关闭）
with open('file.txt', 'r') as f:
    content = f.read()
# 文件自动关闭，即使出错也会关闭
\`\`\`

## 自定义上下文管理器

### 类方式实现

需要实现 \`__enter__\` 和 \`__exit__\` 方法：

\`\`\`python
import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        print(f"耗时: {self.end - self.start:.2f}秒")
        return False  # False 表示不抑制异常

# 使用
with Timer():
    time.sleep(1)
# 输出: 耗时: 1.00秒
\`\`\`

### \`__exit__\` 方法参数

- **exc_type**: 异常类型
- **exc_val**: 异常值
- **exc_tb**: 异常追踪信息
- **返回值**: True 表示抑制异常，False 表示传播异常

## 使用 contextlib 简化

\`\`\`python
from contextlib import contextmanager

@contextmanager
def timer_context():
    start = time.time()
    yield  # 返回控制权给 with 块
    end = time.time()
    print(f"耗时: {end - start:.2f}秒")

with timer_context():
    time.sleep(1)
\`\`\`

## 常见应用场景

### 1. 计时器

\`\`\`python
@contextmanager
def timer(name):
    start = time.time()
    yield
    print(f"{name} 耗时: {time.time() - start:.2f}秒")
\`\`\`

### 2. 临时目录

\`\`\`python
import tempfile
import shutil

@contextmanager
def temp_dir():
    dir = tempfile.mkdtemp()
    try:
        yield dir
    finally:
        shutil.rmtree(dir)
\`\`\`

### 3. 数据库事务

\`\`\`python
@contextmanager
def db_transaction(conn):
    cursor = conn.cursor()
    try:
        yield cursor
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cursor.close()
\`\`\`

## 最佳实践

1. 资源获取（\`__enter__\`）和释放（\`__exit__\`）应该成对出现
2. 在 \`__exit__\` 中处理异常清理
3. 简单场景优先使用 \`@contextmanager\` 装饰器`,

  // 6. 生成器
  'cmkru2vbk0025da85qau8ghiw': `# Python 生成器

## 什么是生成器？

生成器是一种特殊的迭代器，使用 \`yield\` 关键字实现。它允许你**惰性求值**，即按需生成值，而不是一次性生成所有值。

## 生成器函数

\`\`\`python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 使用生成器
for num in fibonacci(10):
    print(num)
# 输出: 0 1 1 2 3 5 8 13 21 34
\`\`\`

## 生成器的优势

### 1. 节省内存

\`\`\`python
# 列表推导式 - 一次性创建百万个元素
squares_list = [x**2 for x in range(1000000)]  # 占用大量内存

# 生成器表达式 - 按需生成
squares_gen = (x**2 for x in range(1000000))  # 几乎不占内存
\`\`\`

### 2. 无限序列

\`\`\`python
def count(start=0):
    n = start
    while True:
        yield n
        n += 1

counter = count()
print(next(counter))  # 0
print(next(counter))  # 1
print(next(counter))  # 2
# 无限继续...
\`\`\`

## 生成器方法

### send() - 向生成器发送值

\`\`\`python
def echo():
    while True:
        received = yield
        print(f"收到: {received}")

e = echo()
next(e)  # 启动生成器
e.send("Hello")  # 输出: 收到: Hello
\`\`\`

### close() - 关闭生成器

\`\`\`python
gen = fibonacci(10)
next(gen)
gen.close()  # 关闭生成器
\`\`\`

### throw() - 向生成器抛出异常

\`\`\`python
gen = fibonacci(10)
next(gen)
gen.throw(ValueError("错误"))  # 生成器内部会收到这个异常
\`\`\`

## 实用场景

### 1. 处理大文件

\`\`\`python
def read_large_file(file_path):
    with open(file_path, 'r') as f:
        for line in f:
            yield line.strip()

for line in read_large_file('huge.txt'):
    process(line)  # 逐行处理，不会占满内存
\`\`\`

### 2. 管道处理

\`\`\`python
def integers():
    for i in range(1, 1000):
        yield i

def filter_even(numbers):
    for n in numbers:
        if n % 2 == 0:
            yield n

def square(numbers):
    for n in numbers:
        yield n ** 2

# 链式调用
pipeline = square(filter_even(integers()))
print(next(pipe))  # 4 (第一个偶数 2 的平方)
\`\`\`

## 生成器 vs 列表

| 特性 | 列表 | 生成器 |
|------|------|--------|
| 内存 | 一次性存储所有值 | 惰性生成，省内存 |
| 遍历 | 可多次遍历 | 只能遍历一次 |
| 索引 | 支持索引访问 | 不支持 |
| 用途 | 小数据集 | 大数据集/无限序列 |

## 最佳实践

1. 处理大数据集时优先使用生成器
2. 生成器函数名应体现其"生成"特性
3. 注意生成器只能遍历一次
4. 使用 \`yield from\` 委托子生成器`,

  // 7. Lambda 和高阶函数
  'cmkru2v30001vda850m0jfj6f': `# Python Lambda 和高阶函数

## Lambda 函数

Lambda 是匿名函数，用一行代码定义简单函数。

### 基本语法

\`\`\`python
multiply = lambda x, y: x * y
print(multiply(3, 4))  # 输出: 12
\`\`\`

### Lambda vs 普通函数

\`\`\`python
# 普通函数
def add(x, y):
    return x + y

# Lambda 函数
add = lambda x, y: x + y
\`\`\`

**注意**: Lambda 只能包含表达式，不能包含语句或多行代码。

## 高阶函数

### 1. map - 对每个元素应用函数

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# 平方每个数字
squared = list(map(lambda x: x**2, numbers))
# [1, 4, 9, 16, 25]

# 等价的列表推导式
squared = [x**2 for x in numbers]
\`\`\`

### 2. filter - 过滤元素

\`\`\`python
numbers = [1, 2, 3, 4, 5]

# 只保留偶数
evens = list(filter(lambda x: x % 2 == 0, numbers))
# [2, 4]

# 等价的列表推导式
evens = [x for x in numbers if x % 2 == 0]
\`\`\`

### 3. reduce - 累积计算

\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# 求和
sum_all = reduce(lambda x, y: x + y, numbers)
# 15 ( ((((1+2)+3)+4)+5) )

# 求积
product = reduce(lambda x, y: x * y, numbers)
# 120
\`\`\`

## 实用示例

### sorted with key

\`\`\`python
students = [('Alice', 25), ('Bob', 20), ('Charlie', 23)]

# 按年龄排序
sorted_students = sorted(students, key=lambda x: x[1])
# [('Bob', 20), ('Charlie', 23), ('Alice', 25)]
\`\`\`

### max/min with key

\`\`\`python
# 找年龄最大的学生
oldest = max(students, key=lambda x: x[1])
# ('Alice', 25)
\`\`\`

### 多条件排序

\`\`\`python
# 先按分数降序，分数相同按年龄升序
students = [
    {'name': 'Alice', 'score': 90, 'age': 20},
    {'name': 'Bob', 'score': 90, 'age': 19},
    {'name': 'Charlie', 'score': 85, 'age': 21}
]

sorted_students = sorted(
    students,
    key=lambda s: (-s['score'], s['age'])
)
\`\`\`

## 列表推导式 vs map/filter

现代 Python 风格指南（PEP 8）推荐：

\`\`\`python
# 推荐：列表推导式
result = [x**2 for x in range(10)]
evens = [x for x in numbers if x % 2 == 0]

# 不推荐：map/filter
result = list(map(lambda x: x**2, range(10)))
evens = list(filter(lambda x: x % 2 == 0, numbers))
\`\`\`

## 使用场景

**适合 Lambda 的场景**:
- 简单的单行函数
- 作为参数传递给高阶函数
- 临时使用的函数

**不适合 Lambda 的场景**:
- 复杂的逻辑
- 需要多行代码
- 需要多次复用（应该定义普通函数）

## 最佳实践

1. Lambda 应该简单明了（一般不超过一行）
2. 复杂逻辑使用普通函数或列表推导式
3. 优先使用列表推导式而非 map/filter`,

  // 8. 异常处理
  'cmkru2uuy001lda85jk8kevla': `# Python 异常处理

## try-except 基础

\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"错误: {e}")
\`\`\`

## 完整的异常处理结构

\`\`\`python
try:
    # 可能出错的代码
    result = 10 / 2
except ZeroDivisionError as e:
    print(f"除零错误: {e}")
except ValueError as e:
    print(f"值错误: {e}")
except Exception as e:
    print(f"未知错误: {e}")
else:
    # 没有异常时执行
    print("没有异常")
finally:
    # 无论是否异常都执行
    print("清理资源")
\`\`\`

## 执行流程

1. **try** - 执行可能出错的代码
2. **except** - 捕获特定类型的异常
3. **else** - 没有异常时执行（可选）
4. **finally** - 无论如何都执行（可选）

## 常见异常类型

| 异常类型 | 触发条件 |
|---------|---------|
| \`ZeroDivisionError\` | 除以零 |
| \`ValueError\` | 值不正确（如 int("abc")） |
| \`TypeError\` | 类型错误（如 "a" + 1） |
| \`IndexError\` | 索引超出范围 |
| \`KeyError\` | 字典键不存在 |
| \`FileNotFoundError\` | 文件不存在 |
| \`AttributeError\` | 对象没有该属性 |

## 自定义异常

\`\`\`python
class CustomError(Exception):
    """自定义异常"""
    pass

class ValidationError(CustomError):
    """验证错误"""
    pass

# 使用自定义异常
try:
    raise ValidationError("用户名不能为空")
except ValidationError as e:
    print(f"验证失败: {e}")
\`\`\`

## 异常链

\`\`\`python
try:
    try:
        1 / 0
    except ZeroDivisionError:
        raise ValueError("包装的异常")
except ValueError as e:
    print(f"捕获: {e}")
    # 可以使用 \`__cause__\` 查看原始异常
\`\`\`

使用 \`from\` 保留原始异常：

\`\`\`python
try:
    try:
        1 / 0
    except ZeroDivisionError as e:
        raise ValueError("包装的异常") from e
\`\`\`

## 实用场景

### 1. 文件操作

\`\`\`python
try:
    with open('file.txt', 'r') as f:
        content = f.read()
except FileNotFoundError:
    print("文件不存在")
except IOError:
    print("读写错误")
\`\`\`

### 2. 用户输入验证

\`\`\`python
def get_age():
    while True:
        try:
            age = int(input("请输入年龄: "))
            if age < 0:
                raise ValueError("年龄不能为负数")
            return age
        except ValueError as e:
            print(f"输入无效: {e}")
\`\`\`

### 3. 资源清理

\`\`\`python
f = None
try:
    f = open('file.txt', 'r')
    # 处理文件
except IOError:
    print("文件错误")
finally:
    if f:
        f.close()  # 确保文件关闭
\`\`\`

## 最佳实践

1. **具体捕获异常** - 不要使用裸 \`except:\`
2. **及时处理** - 不要捕获后不处理
3. **使用 with** - 自动管理资源
4. **自定义异常** - 提供有意义的错误信息
5. **记录日志** - 使用 \`logging\` 模块记录异常`,

  // 9. 类和面向对象
  'cmkru2unb001bda852bacb3ae': `# Python 类和面向对象

## 类的定义

\`\`\`python
class Person:
    # 类属性（所有实例共享）
    species = "Homo sapiens"

    def __init__(self, name, age):
        # 实例属性（每个实例独立）
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name}"

    def __str__(self):
        # 字符串表示
        return f"Person({self.name}, {self.age})"
\`\`\`

## 类 vs 实例属性

\`\`\`python
class Dog:
    species = "Canis lupus"  # 类属性

dog1 = Dog("Buddy")
dog2 = Dog("Max")

dog1.species = "Wolf"  # 创建实例属性
print(dog1.species)  # "Wolf"
print(dog2.species)  # "Canis lupus" - 类属性不变
\`\`\`

## 实例方法、类方法和静态方法

\`\`\`python
class MyClass:
    count = 0

    def __init__(self, value):
        self.value = value
        MyClass.count += 1

    # 实例方法
    def instance_method(self):
        return f"实例方法: {self.value}"

    # 类方法
    @classmethod
    def class_method(cls):
        return f"类方法: {cls.count}"

    # 静态方法
    @staticmethod
    def static_method():
        return "静态方法"
\`\`\`

## 继承

\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"
\`\`\`

## 特殊方法（魔术方法）

\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __add__(self, other):
        # + 运算符
        return Vector(self.x + other.x, self.y + other.y)

    def __str__(self):
        # str() 调用
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        # repr() 调用
        return f"Vector({self.x}, {self.y})"

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # 使用 __add__
print(v3)  # 使用 __str__
\`\`\`

## 封装

\`\`\`python
class BankAccount:
    def __init__(self, initial_balance):
        self.__balance = initial_balance  # 私有属性

    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount

    def get_balance(self):
        return self.__balance

    # 使用 property 装饰器
    @property
    def balance(self):
        return self.__balance
\`\`\`

## 类方法作为工厂

\`\`\`python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_birth_year(cls, name, birth_year):
        age = 2024 - birth_year
        return cls(name, age)

# 使用
person = Person.from_birth_year("Alice", 1990)
\`\`\`

## 最佳实践

1. 使用 \`__\` 前缀表示私有属性
2. 实现 \`__str__\` 和 \`__repr__\` 提供友好的字符串表示
3. 使用 \`@property\` 而非 getter/setter
4. 遵循单一职责原则
5. 优先使用组合而非继承`,

  // 10. 装饰器基础
  'cmkru2uf90011da852hvcqdzu': `# Python 装饰器

## 什么是装饰器？

装饰器是一个函数，用于在不修改原函数代码的情况下，为函数添加额外功能。

## 基本装饰器

\`\`\`python
import functools
import time

def timer(func):
    """计时装饰器"""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} 耗时: {end - start:.2f}秒")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

slow_function()
# 输出: slow_function 耗时: 1.00秒
\`\`\`

## @functools.wraps 的作用

保留原函数的元信息（如 \`__name__\`, \`__doc__\`）：

\`\`\`python
@timer
def my_function():
    """这是一个函数"""
    pass

print(my_function.__name__)  # "my_function"（不是 "wrapper"）
print(my_function.__doc__)   # "这是一个函数"
\`\`\`

## 带参数的装饰器

\`\`\`python
def repeat(times):
    """重复执行函数"""
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    return f"Hello, {name}"

print(greet("Alice"))
# ['Hello, Alice', 'Hello, Alice', 'Hello, Alice']
\`\`\`

## 类装饰器

\`\`\`python
class CountCalls:
    def __init__(self, func):
        self.func = func
        self.count = 0

    def __call__(self, *args, **kwargs):
        self.count += 1
        print(f"调用次数: {self.count}")
        return self.func(*args, **kwargs)

@CountCalls
def say_hello():
    print("Hello!")

say_hello()  # 调用次数: 1
say_hello()  # 调用次数: 2
\`\`\`

## 常用内置装饰器

### @staticmethod

\`\`\`python
class Math:
    @staticmethod
    def add(x, y):
        return x + y
\`\`\`

### @classmethod

\`\`\`python
class Person:
    @classmethod
    def from_dict(cls, data):
        return cls(data['name'], data['age'])
\`\`\`

### @property

\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value <= 0:
            raise ValueError("半径必须为正数")
        self._radius = value

    @property
    def area(self):
        return 3.14 * self._radius ** 2
\`\`\`

## 实用装饰器示例

### 1. 日志装饰器

\`\`\`python
def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} 返回: {result}")
        return result
    return wrapper
\`\`\`

### 2. 缓存装饰器

\`\`\`python
def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
\`\`\`

或者直接使用 \`@functools.lru_cache\`。

### 3. 验证装饰器

\`\`\`python
def validate_types(**types):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            # 验证逻辑
            return func(*args, **kwargs)
        return wrapper
    return decorator
\`\`\`

## 装饰器堆叠

\`\`\`python
@timer
@log
@memoize
def expensive_function(n):
    # ...
    pass
\`\`\`

执行顺序：从下往上应用装饰器。

## 最佳实践

1. 总是使用 \`@functools.wraps\`
2. 保持装饰器简单，专注于单一功能
3. 装饰器应该有清晰的文档字符串
4. 考虑使用类装饰器来管理状态`,

  // 11. 文件读写
  'cmkru2u7s000rda85x8fldtdi': `# Python 文件读写

## 使用 with 语句（推荐）

\`\`\`python
# 读取文件
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    # 文件在这里自动关闭
\`\`\`

## 为什么使用 with？

- 自动关闭文件，即使发生异常
- 代码更简洁，不需要手动调用 \`close()\`

## 文件打开模式

| 模式 | 描述 |
|------|------|
| \`'r'\` | 只读（默认） |
| \`'w'\` | 写入（覆盖已有内容） |
| \`'a'\` | 追加（在文件末尾添加） |
| \`'r+'\` | 读写 |
| \`'rb'\` | 二进制读取 |
| \`'wb'\` | 二进制写入 |

## 读取文件

### 读取全部内容

\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()  # 返回整个文件字符串
\`\`\`

### 逐行读取

\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())  # strip() 去除换行符
\`\`\`

### 读取所有行

\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()  # 返回列表
\`\`\`

## 写入文件

### 写入文本

\`\`\`python
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('Hello, World!')
\`\`\`

### 写入多行

\`\`\`python
lines = ['Line 1', 'Line 2', 'Line 3']
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('\\n'.join(lines))
\`\`\`

### 追加内容

\`\`\`python
with open('log.txt', 'a', encoding='utf-8') as f:
    f.write('New log entry\\n')
\`\`\`

## JSON 文件操作

\`\`\`python
import json

# 写入 JSON
data = {'name': 'Alice', 'age': 25}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
\`\`\`

## CSV 文件操作

\`\`\`python
import csv

# 写入 CSV
with open('data.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['Name', 'Age'])
    writer.writerow(['Alice', 25])

# 读取 CSV
with open('data.csv', 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        print(row)
\`\`\`

## 二进制文件

\`\`\`python
# 读取图片
with open('image.jpg', 'rb') as f:
    image_data = f.read()

# 写入二进制数据
with open('output.bin', 'wb') as f:
    f.write(binary_data)
\`\`\`

## 路径处理

\`\`\`python
from pathlib import Path

# 创建路径
file_path = Path('data') / 'file.txt'

# 检查文件是否存在
if file_path.exists():
    content = file_path.read_text(encoding='utf-8')

# 写入文件
file_path.write_text('Hello', encoding='utf-8')
\`\`\`

## 错误处理

\`\`\`python
try:
    with open('file.txt', 'r') as f:
        content = f.read()
except FileNotFoundError:
    print("文件不存在")
except IOError as e:
    print(f"读写错误: {e}")
\`\`\`

## 最佳实践

1. 总是使用 \`with\` 语句管理文件
2. 明确指定编码（如 \`utf-8\`）
3. 处理可能出现的异常
4. 对于路径操作，优先使用 \`pathlib\`
5. 大文件使用逐行读取，而非 \`read()\``,

  // 12. 字典常用操作
  'cmkru2u0f000hda85ggtw8vd2': `# Python 字典常用操作

## 创建字典

\`\`\`python
# 直接创建
dict1 = {'name': 'Alice', 'age': 25}

# 使用构造函数
dict2 = dict(name='Bob', age=30)

# 从列表创建
dict3 = dict([('name', 'Charlie'), ('age', 35)])
\`\`\`

## 字典推导式

\`\`\`python
# 基本字典推导式
squares_dict = {x: x**2 for x in range(6)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 带条件的字典推导式
even_squares = {x: x**2 for x in range(10) if x % 2 == 0}
# {0: 0, 2: 4, 4: 16, 6: 36, 8: 64}
\`\`\`

## 获取值

### 直接访问（可能报错）

\`\`\`python
value = dict1['name']  # 如果键不存在会报错
\`\`\`

### 使用 get（安全）

\`\`\`python
value = dict1.get('name', 'Unknown')
# 键不存在时返回默认值 'Unknown'
\`\`\`

## 添加和修改

\`\`\`python
dict1['city'] = 'Beijing'  # 添加新键
dict1['age'] = 26  # 修改已有键
\`\`\`

## 合并字典（Python 3.9+）

\`\`\`python
dict1 = {'name': 'Alice', 'age': 25}
dict2 = {'city': 'Beijing', 'age': 26}

# 使用 | 运算符
merged = dict1 | dict2
# {'name': 'Alice', 'age': 26, 'city': 'Beijing'}

# 使用 |= 更新
dict1 |= dict2
\`\`\`

Python 3.8 及之前：

\`\`\`python
# 使用 update
merged = dict1.copy()
merged.update(dict2)

# 使用解包
merged = {**dict1, **dict2}
\`\`\`

## 删除元素

\`\`\`python
# del 语句
del dict1['age']

# pop 方法（返回值）
value = dict1.pop('age', None)

# popitem - 移除最后插入的项
key, value = dict1.popitem()
\`\`\`

## 遍历字典

\`\`\`python
# 遍历键
for key in dict1:
    print(key)

# 遍历值
for value in dict1.values():
    print(value)

# 遍历键值对
for key, value in dict1.items():
    print(f"{key}: {value}")
\`\`\`

## 常用方法

\`\`\`python
dict1.keys()    # 返回所有键的视图
dict1.values()  # 返回所有值的视图
dict1.items()   # 返回所有键值对的视图
dict1.get(key, default)  # 获取值，可指定默认值
dict1.setdefault(key, default)  # 如果键不存在则设置并返回
dict1.update(other_dict)  # 用另一个字典更新
dict1.clear()  # 清空字典
dict1.copy()  # 浅拷贝
\`\`\`

## 有序字典

\`\`\`python
from collections import OrderedDict

# Python 3.7+ 中普通字典已经保持插入顺序
dict1 = {}
dict1['a'] = 1
dict1['b'] = 2
dict1['c'] = 3
# 顺序: a, b, c
\`\`\`

## 嵌套字典

\`\`\`python
users = {
    'user1': {
        'name': 'Alice',
        'age': 25
    },
    'user2': {
        'name': 'Bob',
        'age': 30
    }
}

# 访问嵌套数据
print(users['user1']['name'])
\`\`\`

## 字典比较

\`\`\`python
dict1 = {'a': 1, 'b': 2}
dict2 = {'a': 1, 'b': 2}

dict1 == dict2  # True（顺序无关）
\`\`\`

## 最佳实践

1. 使用 \`get()\` 而非直接访问，避免 KeyError
2. 使用字典推导式简化字典创建
3. 利用 \`setdefault()\` 或 \`defaultdict\` 处理缺失键
4. Python 3.9+ 使用 \`|\` 和 \`|=\` 合并字典`,

  // 13. 列表推导式
  'cmkru2tsu0007da858rhjzexv': `# Python 列表推导式

## 基本列表推导式

\`\`\`python
# 传统方法
squares = []
for x in range(10):
    squares.append(x**2)

# 列表推导式
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
\`\`\`

## 语法结构

\`\`\`python
[表达式 for 元素 in 可迭代对象 if 条件]
\`\`\`

## 带条件的列表推导式

\`\`\`python
# 只保留偶数的平方
even_squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]

# 可以有多个条件
result = [x for x in range(20) if x % 2 == 0 if x % 3 == 0]
# [0, 6, 12, 18] - 同时能被 2 和 3 整除
\`\`\`

## 嵌套列表推导式

### 展平二维列表

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

### 创建二维列表

\`\`\`python
# 3x3 矩阵
matrix = [[i + j*3 for i in range(3)] for j in range(3)]
# [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
\`\`\`

## 复杂表达式

\`\`\`python
# 使用函数
words = ['hello', 'world', 'python']
lengths = [len(word) for word in words]
# [5, 5, 6]

# 转换大小写
upper_words = [word.upper() for word in words]
# ['HELLO', 'WORLD', 'PYTHON']
\`\`\`

## 与 if-else 结合

\`\`\`python
# 根据条件选择不同值
result = ['偶数' if x % 2 == 0 else '奇数' for x in range(5)]
# ['偶数', '奇数', '偶数', '奇数', '偶数']

# 注意：这是选择值，不是过滤
\`\`\`

## 实用示例

### 1. 过滤和转换

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# 大于 5 的数的平方
result = [x**2 for x in numbers if x > 5]
# [36, 49, 64, 81, 100]
\`\`\`

### 2. 处理字符串

\`\`\`python
sentence = "Hello World"
# 提取每个单词的长度
[word.lower() for word in sentence.split()]
# ['hello', 'world']

# 过滤空字符串
words = ['hello', '', 'world', '', 'python']
[word for word in words if word]
# ['hello', 'world', 'python']
\`\`\`

### 3. 坐标系统

\`\`\`python
# 生成所有坐标点
coordinates = [(x, y) for x in range(3) for y in range(3)]
# [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), ...]
\`\`\`

### 4. 文件处理

\`\`\`python
import os
# 获取当前目录所有 Python 文件
python_files = [f for f in os.listdir('.') if f.endswith('.py')]
\`\`\`

## 性能对比

\`\`\`python
# 列表推导式
squares = [x**2 for x in range(1000000)]  # 更快

# map + lambda
squares = list(map(lambda x: x**2, range(1000000)))  # 较慢

# 传统循环
squares = []
for x in range(1000000):
    squares.append(x**2)  # 最慢
\`\`\`

## 可读性权衡

\`\`\`python
# 简单场景 - 列表推导式
squares = [x**2 for x in range(10)]

# 复杂场景 - 传统循环更清晰
result = []
for x in range(10):
    for y in range(10):
        if x * y > 50:
            result.append((x, y))
\`\`\`

## 列表推导式 vs 生成器表达式

\`\`\`python
# 列表推导式 - 立即创建列表
squares_list = [x**2 for x in range(1000000)]  # 占用内存

# 生成器表达式 - 惰性求值
squares_gen = (x**2 for x in range(1000000))  # 节省内存
\`\`\`

## 最佳实践

1. 保持简单 - 复杂逻辑用传统循环
2. 单层推导式最清晰，避免多层嵌套
3. 使用生成器表达式处理大数据集
4. 优先考虑可读性而非简洁性`,

  // 14. React useEffect
  'cmkquqaiz0003dafp3sfqs2br': `# React useEffect Hook 详解

## useEffect 是什么？

\`useEffect\` 是 React 的 Hook，用于处理函数组件中的**副作用**（side effects）。

## 什么是副作用？

副作用是指在函数组件主体之外的代码执行，例如：
- 数据获取（API 调用）
- 订阅外部数据源
- 手动修改 DOM
- 设置定时器
- 日志记录

## 基本语法

\`\`\`typescript
useEffect(() => {
  // 副作用代码
  console.log("Component mounted");

  // 清理函数（可选）
  return () => {
    console.log("Component unmounted");
  };
}, []); // 依赖数组
\`\`\`

## 依赖数组的含义

### 1. 空数组 \`[]\`

\`\`\`typescript
useEffect(() => {
  console.log("只在挂载时执行一次");
}, []);
\`\`\`

相当于 \`componentDidMount\` - 只在组件挂载时执行一次。

### 2. 包含依赖项

\`\`\`typescript
useEffect(() => {
  console.log("count 变化了");
}, [count]);
\`\`\`

相当于 \`componentDidUpdate\` - 当 \`count\` 变化时执行。

### 3. 无依赖数组

\`\`\`typescript
useEffect(() => {
  console.log("每次渲染都执行");
});
\`\`\`

每次组件渲染后都会执行。

## 清理函数

\`\`\`typescript
useEffect(() => {
  const timer = setInterval(() => {
    console.log("Tick");
  }, 1000);

  // 返回清理函数
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

清理函数在：
1. 组件卸载时执行
2. 下一次 effect 执行前执行

## 常见使用场景

### 1. 数据获取

\`\`\`typescript
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/user');
    const data = await response.json();
    setUser(data);
  };

  fetchData();
}, []);
\`\`\`

### 2. 订阅事件

\`\`\`typescript
useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
\`\`\`

### 3. 定时器

\`\`\`typescript
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
\`\`\`

## 重要注意事项

### 1. 不要在 useEffect 中直接更新依赖项

\`\`\`typescript
// 错误 - 无限循环
useEffect(() => {
  setCount(count + 1);
}, [count]);

// 正确 - 使用函数式更新
useEffect(() => {
  setCount(c => c + 1);
}, []);
\`\`\`

### 2. 确保依赖数组包含所有使用的值

\`\`\`typescript
useEffect(() => {
  const subscription = props.source.subscribe();
  return () => {
    subscription.unsubscribe();
  };
}, [props.source]); // ✓ 正确
\`\`\`

### 3. 异步函数处理

\`\`\`typescript
// 错误 - useEffect 不能直接返回 Promise
useEffect(async () => {
  const data = await fetchData();
}, []);

// 正确 - 在内部定义异步函数
useEffect(() => {
  const fetchData = async () => {
    const data = await fetchData();
    setData(data);
  };

  fetchData();
}, []);
\`\`\`

## 最佳实践

1. **每次 effect 都应该有返回类型明确** - 要么返回清理函数，要么不返回
2. **依赖数组应该完整** - 包含 effect 内部使用的所有响应式值
3. **一个 effect 做一件事** - 不要在同一个 effect 中混合多个不相关的副作用
4. **使用 ESLint** - 启用 \`exhaustive-deps\` 规则检测依赖问题`,
};

async function addTutorials() {
  console.log('开始为代码片段添加教学说明...\n');

  for (const [id, tutorial] of Object.entries(tutorials)) {
    try {
      // 获取当前 snippet
      const snippet = await prisma.snippet.findUnique({
        where: { id },
        include: {
          tags: {
            include: { tag: true },
          },
        },
      });

      if (!snippet) {
        console.log(`⚠️  未找到片段: ${id}`);
        continue;
      }

      // 提取标签名
      const tags = snippet.tags.map(t => t.tag.name);

      // 更新 snippet
      await prisma.snippet.update({
        where: { id },
        data: {
          tutorial,
        },
      });

      console.log(`✅ 已更新: ${snippet.title}`);

      // 等待一下避免过快
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`❌ 错误 (${id}):`, error.message);
    }
  }

  console.log('\n所有教学说明添加完成！');
}

addTutorials()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
