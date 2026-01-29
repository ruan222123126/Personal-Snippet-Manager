// 为 Python 代码片段添加详细的教学内容
const API_BASE = 'http://localhost:3002/api/snippets';

// Python 代码片段的教学内容映射
const tutorials = {
  // 列表推导式
  'cmkrwzv0l0004damzaxprm136': `## 什么是列表推导式？

列表推导式（List Comprehension）是 Python 中创建列表的**简洁语法**，它可以用一行代码替代多行的 for 循环。

### 基本语法

\`\`\`python
[表达式 for 变量 in 可迭代对象 if 条件]
\`\`\`

### 三种常见用法

#### 1. 基本列表推导式
将列表中每个元素进行转换：

\`\`\`python
numbers = [1, 2, 3, 4, 5]
squares = [x**2 for x in numbers]
# 结果: [1, 4, 9, 16, 25]
\`\`\`

**等价于传统循环**：
\`\`\`python
squares = []
for x in numbers:
    squares.append(x**2)
\`\`\`

#### 2. 带条件过滤
只保留满足条件的元素：

\`\`\`python
numbers = [1, 2, 3, 4, 5]
even_squares = [x**2 for x in numbers if x % 2 == 0]
# 结果: [4, 16]
\`\`\`

#### 3. 嵌套列表推导式
处理多维列表（如矩阵）：

\`\`\`python
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
# 结果: [1, 2, 3, 4, 5, 6, 7, 8, 9]
\`\`\`

### 使用场景

- **数据转换**：对列表中的每个元素应用相同操作
- **数据过滤**：根据条件筛选元素
- **数据扁平化**：将多维列表转为一维

### 注意事项

⚠️ **可读性优先**：如果推导式过于复杂，改用传统循环可能更清晰。

\`\`\`python
# 不推荐：过于复杂
result = [x**2 for x in numbers if x > 2 if x % 2 == 0]

# 推荐：使用传统循环
result = []
for x in numbers:
    if x > 2 and x % 2 == 0:
        result.append(x**2)
\`\`\`,

  // 字典操作
  'cmkrwzv57000hdamzotskrhh2': `## Python 字典（Dictionary）

字典是 Python 中最重要的**数据结构**之一，它存储**键值对**（key-value pairs）。

### 基本操作

#### 1. 创建字典

\`\`\`python
# 方式 1：直接创建
person = {'name': 'Alice', 'age': 30}

# 方式 2：使用 dict() 构造函数
person = dict(name='Alice', age=30)

# 方式 3：从列表创建
person = dict([('name', 'Alice'), ('age', 30)])
\`\`\`

#### 2. 访问元素

\`\`\`python
# 使用键访问
name = person['name']  # 'Alice'

# 使用 get() 方法（推荐，避免 KeyError）
email = person.get('email', 'N/A')  # 如果键不存在，返回 'N/A'
\`\`\`

#### 3. 遍历字典

\`\`\`python
# 遍历所有键
for key in person.keys():
    print(key)

# 遍历所有值
for value in person.values():
    print(value)

# 遍历所有键值对
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`

### 高级操作

#### 字典推导式
\`\`\`python
squares = {x: x**2 for x in range(5)}
# 结果: {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}
\`\`\`

#### 合并字典

\`\`\`python
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}

# 方式 1：使用 ** 解包（Python 3.5+）
merged = {**dict1, **dict2}

# 方式 2：使用 update() 方法
dict1.update(dict2)

# 方式 3：使用 | 运算符（Python 3.9+）
merged = dict1 | dict2
\`\`\`

### 常用方法

| 方法 | 说明 |
|------|------|
| \`get(key, default)\` | 获取值，键不存在时返回默认值 |
| \`keys()\` | 返回所有键的视图 |
| \`values()\` | 返回所有值的视图 |
| \`items()\` | 返回所有键值对的视图 |
| \`update(other)\` | 用另一个字典更新当前字典 |
| \`pop(key, default)\` | 删除并返回键对应的值 |

### 使用场景

- **配置存储**：存储程序配置信息
- **数据聚合**：按类别统计数据
- **快速查找**：O(1) 时间复杂度的查找`,

  // 文件读写
  'cmkrwzv9s000udamzlaol7d8m': `## Python 文件读写操作

文件操作是编程中的**基础技能**，Python 使用 \`open()\` 函数打开文件。

### 基本语法

\`\`\`python
open(filename, mode, encoding='utf-8')
\`\`\`

**常用模式**：
- \`'r'\` - 只读（文件必须存在）
- \`'w'\` - 写入（会覆盖已有内容）
- \`'a'\` - 追加（在文件末尾写入）
- \`'r+'\` - 读写模式
- \`'b'\` - 二进制模式（如 \`'rb'\`, \`'wb'\`）

### 读取文件的三种方式

#### 1. 一次性读取全部
\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
\`\`\`
**适用场景**：文件较小，需要全部内容

#### 2. 逐行读取
\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())  # strip() 去除换行符
\`\`\`
**适用场景**：大文件，节省内存

#### 3. 读取所有行到列表
\`\`\`python
with open('file.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()
\`\`\`
**适用场景**：需要随机访问各行

### 写入文件

\`\`\`python
# 覆盖写入
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("Hello, World!\\n")

# 追加写入
with open('output.txt', 'a', encoding='utf-8') as f:
    f.write("New line\\n")

# 写入多行
lines = ["Line 1\\n", "Line 2\\n"]
with open('output.txt', 'w', encoding='utf-8') as f:
    f.writelines(lines)
\`\`\`

### JSON 文件操作

JSON 是**数据交换的常用格式**：

\`\`\`python
import json

# 写入 JSON
data = {'name': 'Alice', 'age': 30}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
\`\`\`

### 最佳实践

✅ **始终使用 \`with\` 语句**：自动关闭文件，即使发生异常

✅ **指定编码**：使用 \`encoding='utf-8'\` 避免中文乱码

✅ **处理大文件用逐行读取**：节省内存

❌ **不要忘记关闭文件**：不用 \`with\` 时必须 \`f.close()\``,

  // 装饰器
  'cmkrwzvdo0017damzhk2yucd9': `## Python 装饰器（Decorator）

装饰器是 Python 的**高级特性**，它可以在**不修改原函数代码**的情况下，为函数添加额外功能。

### 装饰器的本质

装饰器是一个**接受函数并返回新函数**的函数：

\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Before")
        func()
        print("After")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")
\`\`\`

**等价于**：
\`\`\`python
say_hello = my_decorator(say_hello)
\`\`\`

### 三种装饰器模式

#### 1. 基本装饰器
在函数前后执行操作：

\`\`\`python
def logger(func):
    def wrapper():
        print(f"Calling {func.__name__}")
        func()
    return wrapper

@logger
def greet():
    print("Hello!")
\`\`\`

#### 2. 带参数的装饰器
使用 \`*args\` 和 \`**kwargs\` 传递任意参数：

\`\`\`python
from functools import wraps

def timer(func):
    @wraps(func)  # 保留原函数的元信息
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f}s")
        return result
    return wrapper
\`\`\`

**为什么要用 \`@wraps\`？**
保留原函数的 \`__name__\`、\`__doc__\` 等属性。

#### 3. 装饰器工厂
接受参数的装饰器：

\`\`\`python
def repeat(times):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    return f"Hello, {name}!"

print(greet("Alice"))  # ['Hello, Alice!', 'Hello, Alice!', 'Hello, Alice!']
\`\`\`

### 常见应用场景

| 场景 | 示例装饰器 |
|------|----------|
| 性能分析 | \`@timer\` - 测量函数执行时间 |
| 日志记录 | \`@logger\` - 记录函数调用 |
| 缓存 | \`@lru_cache\` - 缓存函数结果 |
| 权限验证 | \`@login_required\` - 检查用户登录 |
| 重试机制 | \`@retry\` - 失败时自动重试 |

### 注意事项

⚠️ **装饰器会改变原函数的引用**：使用 \`@wraps(func)\` 保留元信息

⚠️ **装饰器的执行顺序**：
\`\`\`python
@decorator1
@decorator2
def func():
    pass
# 等价于 func = decorator1(decorator2(func))
\`\`\`

### 内置装饰器

Python 提供了三个内置装饰器：
- \`@staticmethod\` - 静态方法
- \`@classmethod\` - 类方法
- \`@property\` - 属性访问器`,

  // 上下文管理器
  'cmkrwzvvhu001kdamz8rostnu4': `## Python 上下文管理器（Context Manager）

上下文管理器用于**自动管理资源**，确保资源在使用后被正确释放，即使发生异常。

### 基本概念

使用 \`with\` 语句的上下文管理器：

\`\`\`python
with open('file.txt', 'r') as f:
    content = f.read()
# 文件会自动关闭，即使发生异常
\`\`\`

### 两种实现方式

#### 方式 1：基于类的上下文管理器

需要实现 \`__enter__\` 和 \`__exit__\` 方法：

\`\`\`python
import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        print(f"Elapsed: {self.end - self.start:.2f}s")

with Timer():
    time.sleep(1)
# 输出: Elapsed: 1.00s
\`\`\`

**方法说明**：
- \`__enter__()\`：进入上下文时调用，返回值赋给 \`as\` 后的变量
- \`__exit__(exc_type, exc_val, exc_tb)\`：退出时调用，异常信息通过参数传递

#### 方式 2：使用 @contextmanager 装饰器

更简洁的写法，适合简单场景：

\`\`\`python
from contextlib import contextmanager

@contextmanager
def change_directory(path):
    import os
    old_dir = os.getcwd()
    try:
        os.chdir(path)
        yield  # 暂停，执行 with 块内的代码
    finally:
        os.chdir(old_dir)  # 恢复原目录

with change_directory('/tmp'):
    print(os.getcwd())  # /tmp
print(os.getcwd())  # 恢复原目录
\`\`\`

### 实用示例

#### 自定义文件操作
\`\`\`python
@contextmanager
def custom_open(filename, mode):
    f = open(filename, mode)
    try:
        yield f
    finally:
        f.close()
\`\`\`

#### 临时切换状态
\`\`\`python
@contextmanager
def suppress_print():
    import sys
    old_stdout = sys.stdout
    try:
        sys.stdout = open(os.devnull, 'w')
        yield
    finally:
        sys.stdout = old_stdout
\`\`\`

#### 数据库事务
\`\`\`python
@contextmanager
def db_transaction(connection):
    cursor = connection.cursor()
    try:
        yield cursor
        connection.commit()
    except Exception:
        connection.rollback()
        raise
    finally:
        cursor.close()
\`\`\`

### 使用场景

| 场景 | 示例 |
|------|------|
| 文件操作 | \`open()\` |
| 锁管理 | \`threading.Lock()\` |
| 数据库事务 | 自定义事务管理器 |
| 临时状态 | 切换目录、环境变量 |
| 性能测试 | \`Timer\` 上下文管理器 |

### 最佳实践

✅ **始终使用上下文管理器管理资源**：文件、锁、连接等

✅ \`__exit__\` 中处理异常**：记录日志、清理资源

✅ **简单场景用 \`@contextmanager\`**：代码更简洁

❌ **不要在 \`__exit__\` 中重新抛出异常**：返回 \`True\` 抑制异常，\`False\` 继续抛出`,

  // 异常处理
  'cmkrwzvmd001xdamz2kz2c4qy': `## Python 异常处理

异常处理让程序在遇到错误时**优雅地处理**，而不是直接崩溃。

### 基本结构

\`\`\`python
try:
    # 可能抛出异常的代码
    result = 10 / 0
except ZeroDivisionError as e:
    # 处理特定异常
    print(f"Error: {e}")
else:
    # 没有异常时执行（可选）
    print(f"Result: {result}")
finally:
    # 总是执行（可选）
    print("Cleanup code")
\`\`\`

### 多个 except 块

处理不同类型的异常：

\`\`\`python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("Invalid input! Please enter a number.")
except ZeroDivisionError:
    print("Cannot divide by zero!")
except Exception as e:
    print(f"Unexpected error: {e}")
\`\`\`

### 捕获多个异常

\`\`\`python
try:
    # 代码
except (ValueError, TypeError) as e:
    print(f"Error: {e}")
\`\`\`

### 抛出异常

使用 \`raise\` 抛出异常：

\`\`\`python
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age < 18:
        raise ValueError("Must be 18 or older")
    return True
\`\`\`

### 自定义异常

创建自己的异常类：

\`\`\`python
class CustomError(Exception):
    def __init__(self, message, code):
        self.message = message
        self.code = code
        super().__init__(self.message)

try:
    raise CustomError("Something went wrong", 500)
except CustomError as e:
    print(f"Error {e.code}: {e.message}")
\`\`\`

### 常见异常类型

| 异常 | 说明 |
|------|------|
| \`ValueError\` | 值错误 |
| \`TypeError\` | 类型错误 |
| \`ZeroDivisionError\` | 除以零 |
| \`KeyError\` | 字典键不存在 |
| \`IndexError\` | 列表索引超出范围 |
| \`FileNotFoundError\` | 文件不存在 |
| \`AttributeError\` | 属性不存在 |
| \`ImportError\` | 模块导入失败 |

### 异常链

使用 \`raise ... from\` 保留原始异常：

\`\`\`python
try:
    data = load_data()
except ValueError as e:
    raise RuntimeError("Failed to process data") from e
\`\`\`

### 最佳实践

✅ **具体化异常捕获**：避免使用裸 \`except:\`

\`\`\`python
# 不推荐
try:
    ...
except:
    pass

# 推荐
try:
    ...
except SpecificError:
    handle_error()
\`\`\`

✅ **使用 \`finally\` 清理资源**：确保资源被释放

✅ **提供有用的错误信息**：帮助调试

❌ **不要吞掉异常**：至少记录日志

❌ **不要过度捕获**：让异常向上传播到合适的处理位置`,

  // 类和继承
  'cmkrwzvrj002adamz2ww9fig6': `## Python 面向对象编程

Python 是一门**面向对象**的语言，类（Class）是创建对象的模板。

### 基本类定义

\`\`\`python
class Person:
    # 类属性（所有实例共享）
    species = "Homo sapiens"

    def __init__(self, name, age):
        # 实例属性（每个实例独立）
        self.name = name
        self.age = age

    def greet(self):
        # 实例方法
        return f"Hi, I'm {self.name}"

    def __str__(self):
        # 字符串表示
        return f"Person(name={self.name}, age={self.age})"
\`\`\`

**关键字说明**：
- \`self\`：指向实例本身
- \`__init__\`：构造函数，创建实例时调用
- \`__str__\`：字符串表示，\`print()\` 时调用

### 继承

子类继承父类的属性和方法：

\`\`\`python
class Student(Person):
    def __init__(self, name, age, school):
        # 调用父类构造
        super().__init__(name, age)
        self.school = school

    def greet(self):
        # 方法重写（Override）
        return f"Hi, I'm {self.name} from {self.school}"
\`\`\`

### 多继承

Python 支持**多继承**（谨慎使用）：

\`\`\`python
class Teacher:
    def teach(self):
        return "Teaching..."

class TeachingStudent(Student, Teacher):
    pass  # 继承两个父类的所有方法

ts = TeachingStudent("Carol", 25, "Stanford")
print(ts.teach())  # Teaching...
\`\`\`

### 属性访问控制

Python 没有真正的私有属性，但有**命名约定**：

\`\`\`python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # 名称改写（Name Mangling）

    @property
    def balance(self):
        # getter
        return self.__balance

    @balance.setter
    def balance(self, value):
        # setter
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = value
\`\`\`

**命名约定**：
- \`_attr\`：受保护属性（约定）
- \`__attr\`：私有属性（名称改写）
- \`__attr__\`：魔法方法（如 \`__init__\`）

### 特殊方法（魔法方法）

| 方法 | 说明 |
|------|------|
| \`__init__\` | 构造函数 |
| \`__str__\` | 字符串表示 |
| \`__repr__\` | 开发者表示 |
| \`__eq__\` | 等于比较 |
| \`__lt__\` | 小于比较 |
| \`__len__\` | \`len()\` 函数 |
| \`__getitem__\` | 索引访问 \`obj[key]\` |

### 使用场景

| 概念 | 适用场景 |
|------|----------|
| 封装 | 隐藏内部实现细节 |
| 继承 | 复用代码，建立层次关系 |
| 多态 | 统一接口，不同实现 |

### 最佳实践

✅ **优先使用组合而非继承**：组合更灵活

✅ **使用 \`@property\` 控制访问**：而不是 getter/setter 方法

✅ **遵循最小惊讶原则**：方法行为符合预期

❌ **避免过深的继承层次**：难以维护

❌ **谨慎使用多继承**：容易产生钻石问题（可用 Mixin）`,

  // 生成器
  'cmkrwzvwy002ndamztpshv8ho': `## Python 生成器（Generator）

生成器是 Python 中**惰性求值**的迭代器，它可以**按需生成值**，节省内存。

### 生成器函数

使用 \`yield\` 关键字创建：

\`\`\`python
def count_up_to(n):
    count = 1
    while count <= n:
        yield count  # 暂停并返回值
        count += 1

# 使用生成器
for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5
\`\`\`

**与普通函数的区别**：
- 普通函数 \`return\` 一次返回所有结果
- 生成器 \`yield\` 多次返回值，每次恢复执行

### 生成器表达式

类似列表推导式，但返回生成器：

\`\`\`python
# 列表推导式（立即创建列表）
squares_list = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]

# 生成器表达式（惰性求值）
squares_gen = (x**2 for x in range(5))
print(list(squares_gen))  # [0, 1, 4, 9, 16]
\`\`\`

### 无限序列

生成器可以表示**无限序列**：

\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 获取前 10 个斐波那契数
fib = fibonacci()
for _ in range(10):
    print(next(fib))  # 0, 1, 1, 2, 3, 5, 8, 13, 21, 34
\`\`\`

### 生成器的优势

#### 节省内存

\`\`\`python
# 列表：占用大量内存
numbers = [x for x in range(1000000)]  # ~8MB

# 生成器：几乎不占用内存
def generate_numbers(n):
    for i in range(n):
        yield i
\`\`\`

#### 处理大文件

\`\`\`python
def read_large_file(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

# 逐行处理，不加载整个文件
for line in read_large_file('huge.txt'):
    process(line)
\`\`\`

### 管道式生成器

将生成器串联起来：

\`\`\`python
def filter_even(numbers):
    for n in numbers:
        if n % 2 == 0:
            yield n

def square(numbers):
    for n in numbers:
        yield n ** 2

numbers = range(10)
result = square(filter_even(numbers))
print(list(result))  # [0, 4, 16, 36, 64]
\`\`\`

### 生成器方法

| 方法 | 说明 |
|------|------|
| \`__next__()\` | 获取下一个值 |
| \`send(value)\` | 发送值到生成器 |
| \`throw()\` | 在生成器内抛出异常 |
| \`close()\` | 关闭生成器 |

### 使用场景

| 场景 | 示例 |
|------|------|
| 大文件处理 | 逐行读取日志文件 |
| 无限序列 | 斐波那契数列、素数生成 |
| 数据流处理 | ETL 管道 |
| 节省内存 | 处理大数据集 |

### 生成器 vs 列表

| 特性 | 列表 | 生成器 |
|------|------|--------|
| 内存占用 | 高 | 低 |
| 迭代次数 | 多次 | 一次 |
| 索引访问 | 支持 | 不支持 |
| 惰性求值 | 否 | 是 |

### 最佳实践

✅ **处理大数据时使用生成器**：节省内存

✅ **生成器表达式用于简单情况**：代码更简洁

✅ **管道式处理**：将生成器串联

❌ **不要重复迭代**：生成器只能迭代一次

❌ **不要滥用**：小数据集用列表更简单`,

  // 多线程与多进程
  'cmkrwzw2s0030damz6moykmup': `## Python 并发编程：多线程与多进程

并发编程让程序**同时执行多个任务**，提高性能。

### 多线程（Threading）

适合 **I/O 密集型**任务（网络请求、文件操作）：

\`\`\`python
import threading
import time

def worker(name):
    print(f"Worker {name} starting")
    time.sleep(1)
    print(f"Worker {name} done")

# 创建线程
threads = []
for i in range(5):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

# 等待所有线程完成
for t in threads:
    t.join()
\`\`\`

### 使用线程池

\`\`\`python
from concurrent.futures import ThreadPoolExecutor

def worker(name):
    return f"Worker {name} done"

with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(worker, i) for i in range(3)]
    for future in futures:
        print(future.result())
\`\`\`

### 多进程（Multiprocessing）

适合 **CPU 密集型**任务（计算密集型）：

\`\`\`python
from concurrent.futures import ProcessPoolExecutor

def cpu_bound_task(n):
    total = 0
    for i in range(n):
        total += i ** 2
    return total

if __name__ == '__main__':
    with ProcessPoolExecutor() as executor:
        results = executor.map(cpu_bound_task, [10000, 20000, 30000])
        print(list(results))
\`\`\`

**注意**：Windows 下多进程必须放在 \`if __name__ == '__main__':\` 中。

### 多线程 vs 多进程

| 特性 | 多线程 | 多进程 |
|------|--------|--------|
| 适用场景 | I/O 密集型 | CPU 密集型 |
| 内存共享 | 共享 | 独立 |
| 创建开销 | 低 | 高 |
| GIL 限制 | 受限 | 不受 |
| 通信方式 | 共享变量、队列 | 管道、队列 |

### 什么是 GIL？

**GIL（全局解释器锁）**：同一时刻只有一个线程执行 Python 字节码。

**影响**：
- ✅ I/O 操作时会释放 GIL（多线程适合 I/O 密集型）
- ❌ CPU 计算时不释放 GIL（多进程适合 CPU 密集型）

### 线程间通信

\`\`\`python
import queue

q = queue.Queue()

def producer():
    for i in range(5):
        q.put(i)
        time.sleep(0.1)

def consumer():
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Consumed: {item}")
        q.task_done()

t1 = threading.Thread(target=producer)
t2 = threading.Thread(target=consumer)
t1.start()
t2.start()
t1.join()
t2.join()
\`\`\`

### 线程安全

使用锁保护共享资源：

\`\`\`python
lock = threading.Lock()

def safe_increment(counter):
    with lock:
        counter += 1
\`\`\`

### 使用场景

| 场景 | 推荐方式 |
|------|----------|
| 网络爬虫 | 多线程 |
| 文件处理 | 多线程 |
| 数据分析 | 多进程 |
| 机器学习 | 多进程 |
| Web 服务器 | 多线程（异步） |

### 最佳实践

✅ **I/O 密集型用多线程**：网络、文件操作

✅ **CPU 密集型用多进程**：计算、数据处理

✅ **使用线程池/进程池**：简化管理

✅ **注意线程安全**：使用锁保护共享资源

❌ **不要过度并发**：线程/进程数量要适中

❌ **不要在多进程中共享状态**：进程间内存独立`,

  // 数据类
  'cmkrwzw7n003ddamz3lzp2187': `## Python 数据类（dataclass）

\`dataclass\` 是 Python 3.7+ 的装饰器，用于**自动创建类方法**，简化类的定义。

### 基本用法

\`\`\`python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    email: str = ""  # 默认值

# 自动生成 __init__, __repr__, __eq__
person = Person(name="Alice", age=30, email="alice@example.com")
print(person)  # Person(name='Alice', age=30, email='alice@example.com')
\`\`\`

**自动生成的方法**：
- \`__init__\`：构造函数
- \`__repr__\`：字符串表示
- \`__eq__\`：等于比较
- \`__hash__\`：哈希值（需要 \`frozen=True\` 或 \`eq=False\`）

### 不可变数据类

\`\`\`python
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
# p.x = 2.0  # 会报错，因为不可变
\`\`\`

**好处**：
- 线程安全
- 可哈希（可以作为字典键）
- 防止意外修改

### 字段默认值

\`\`\`python
from dataclasses import dataclass, field
from typing import List

@dataclass
class Student:
    name: str
    grades: List[int] = field(default_factory=list)

student = Student(name="Bob")
print(student.grades)  # []
\`\`\`

**为什么用 \`default_factory\`？**
避免可变对象的共享问题：

\`\`\`python
# 错误：所有实例共享同一个列表
grades: List[int] = []

# 正确：每个实例有独立的列表
grades: List[int] = field(default_factory=list)
\`\`\`

### 计算字段

使用 \`@property\` 创建计算属性：

\`\`\`python
@dataclass
class Circle:
    radius: float

    @property
    def area(self) -> float:
        return 3.14 * self.radius ** 2

circle = Circle(radius=5)
print(circle.area)  # 78.5
\`\`\`

### 比较和排序

\`\`\`python
@dataclass(order=True)
class Employee:
    name: str
    salary: float

e1 = Employee("Alice", 50000)
e2 = Employee("Bob", 60000)
print(e1 < e2)  # True（比较 salary）
\`\`\`

**自动生成的方法**：
- \`__lt__\`：小于
- \`__le__\`：小于等于
- \`__gt__\`：大于
- \`__ge__\`：大于等于

### 字段选项

\`\`\`python
@dataclass
class Example:
    x: int = field(default=0, compare=False, metadata={"unit": "kg"})
    y: int = field(init=False)  # 不在 __init__ 中
\`\`\`

**参数说明**：
- \`default\`：默认值
- \`default_factory\`：默认值工厂函数
- \`compare\`：是否参与比较
- \`metadata\`：元数据
- \`init\`：是否在 \`__init__\` 中
- \`repr\`：是否在 \`__repr__\` 中显示

### dataclass vs 普通类 vs NamedTuple

| 特性 | dataclass | 普通类 | NamedTuple |
|------|-----------|--------|------------|
| 代码简洁性 | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| 可变性 | 可选 | 可变 | 不可变 |
| 类型提示 | 支持 | 可选 | 支持 |
| 继承 | 支持 | 支持 | 不支持 |
| 方法 | 可添加 | 可添加 | 不可添加 |

### 使用场景

| 场景 | 推荐方式 |
|------|----------|
| 数据容器 | \`dataclass\` |
| 不可变数据 | \`@dataclass(frozen=True)\` |
| 简单数据 | \`NamedTuple\` |
| 复杂逻辑 | 普通类 |

### 最佳实践

✅ **优先使用 dataclass 存储数据**：代码更简洁

✅ **使用类型提示**：提高可读性和类型安全

✅ **不可变数据用 \`frozen=True\`**：防止意外修改

✅ **可变默认值用 \`field(default_factory=...)\`**：避免共享问题

❌ **不要在 dataclass 中放复杂逻辑**：保持简单

❌ **不要过度使用 \`order=True\`**：只在需要排序时使用`,

  // 类型注解
  'cmkrwzwcb003qdamz1fw9umux': `## Python 类型注解（Type Hints）

类型注解是 Python 3.5+ 的特性，用于**标注变量和函数的类型**，提高代码可读性和类型安全。

### 基本类型注解

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}"

# 参数 name 的类型是 str
# 返回值的类型是 str
\`\`\`

### 集合类型注解

\`\`\`python
from typing import List, Dict, Tuple, Set

def process_numbers(numbers: List[int]) -> Dict[str, int]:
    return {
        "sum": sum(numbers),
        "count": len(numbers)
    }

# List[int]：整数列表
# Dict[str, int]：字符串键、整数值的字典
\`\`\`

**常用集合类型**：
- \`List[T]\`：列表，元素类型为 T
- \`Dict[K, V]\`：字典，键类型 K，值类型 V
- \`Tuple[T1, T2, ...]\`：元组，固定类型
- \`Set[T]\`：集合，元素类型为 T

### Optional 类型

表示值**可能为 None**：

\`\`\`python
from typing import Optional

def find_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Alice"
    return None

# 等价于 Union[str, None]
\`\`\`

### Union 类型

表示**多种可能的类型**：

\`\`\`python
from typing import Union

def parse_value(value: Union[str, int]) -> int:
    if isinstance(value, str):
        return int(value)
    return value

# Union[str, int]：str 或 int
\`\`\`

**Python 3.10+ 简写**：
\`\`\`python
def parse_value(value: str | int) -> int:
    ...
\`\`\`

### Callable 类型

表示**可调用对象**（函数、方法等）：

\`\`\`python
from typing import Callable

def apply_func(values: List[int], func: Callable[[int], int]) -> List[int]:
    return [func(x) for x in values]

# Callable[[int], int]：接受 int，返回 int 的函数
\`\`\`

### 泛型（TypeVar）

使用类型变量创建**通用类型**：

\`\`\`python
from typing import TypeVar, List

T = TypeVar('T')

def first(items: List[T]) -> T:
    return items[0]

# first 函数适用于任何类型的列表
\`\`\`

### 类型别名

为复杂类型创建**别名**：

\`\`\`python
from typing import Dict, Union

UserId = int
UserData = Dict[str, Union[str, int]]

def get_user(user_id: UserId) -> UserData:
    return {"name": "Alice", "age": 30}
\`\`\`

### Protocol（协议）

定义**接口规范**（结构化子类型）：

\`\`\`python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None:
        ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

def render(obj: Drawable) -> None:
    obj.draw()

circle = Circle()
render(circle)  # ✅ Circle 实现了 draw 方法
\`\`\`

### 类型检查工具

#### mypy：静态类型检查器

\`\`\`bash
pip install mypy
mypy your_file.py
\`\`\`

#### VS Code 配置

安装 \`Pylance\` 扩展，启用类型检查。

### 完整示例

\`\`\`python
from typing import List, Dict, Optional, Callable, TypeVar, Protocol

T = TypeVar('T')

class Processor(Protocol):
    def process(self, data: int) -> str:
        ...

def transform(
    data: List[int],
    func: Optional[Callable[[int], str]] = None
) -> Dict[str, List[str]]:
    if func is None:
        func = str

    return {
        "results": [func(x) for x in data]
    }
\`\`\`

### 使用场景

| 场景 | 好处 |
|------|------|
| 大型项目 | 提高代码可维护性 |
| 团队协作 | 明确接口规范 |
| IDE 支持 | 自动补全、错误提示 |
| 重构 | 减少类型错误 |

### 类型注解的局限性

⚠️ **Python 不会在运行时强制检查类型**：

\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}"

# 不会报错，但类型不正确
greet(123)  # "Hello, 123"
\`\`\`

使用 mypy 等工具进行**静态类型检查**。

### 最佳实践

✅ **为公共 API 添加类型注解**：提高可用性

✅ **使用 Optional 表示可选值**：明确 None 的可能性

✅ **使用 Protocol 定义接口**：灵活的类型约束

✅ **运行 mypy 进行类型检查**：提前发现错误

❌ **不要过度使用 Union**：可能表示设计问题

❌ **不要使用 Any**：除非必要（失去类型检查）

### 学习资源

- [Python typing 文档](https://docs.python.org/zh-cn/3/library/typing.html)
- [mypy 文档](https://mypy.readthedocs.io/)
- [Type Hints Cheat Sheet](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html)`
};

// 为每个代码片段更新教学内容
async function updateTutorials() {
  const entries = Object.entries(tutorials);
  let successCount = 0;
  let failCount = 0;

  for (const [id, tutorial] of entries) {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tutorial }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Updated: ${result.title}`);
        successCount++;
      } else {
        const error = await response.json();
        console.error(`❌ Failed to update ${id}:`, error);
        failCount++;
      }
    } catch (error) {
      console.error(`❌ Error updating ${id}:`, error.message);
      failCount++;
    }
  }

  console.log(\`\n📊 Summary: \${successCount} succeeded, \${failCount} failed\`);
}

updateTutorials();
