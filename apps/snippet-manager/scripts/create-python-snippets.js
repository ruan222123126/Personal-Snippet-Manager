// 创建常用的 Python 代码片段
const API_URL = 'http://localhost:3002/api/snippets';

const pythonSnippets = [
  {
    title: '列表推导式',
    code: `# 列表推导式 - 创建新列表的简洁方式
numbers = [1, 2, 3, 4, 5]

# 基本用法
squares = [x**2 for x in numbers]
print(squares)  # [1, 4, 9, 16, 25]

# 带条件过滤
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares)  # [4, 16]

# 嵌套列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`,
    language: 'python',
    description: '列表推导式是 Python 中创建列表的简洁方式，可以替代 map 和 filter 函数',
    tags: ['python', '列表', '推导式', '基础']
  },

  {
    title: '字典操作',
    code: `# Python 字典常用操作
# 创建字典
person = {
    'name': 'Alice',
    'age': 30,
    'city': 'Beijing'
}

# 访问和修改
print(person['name'])  # Alice
person['age'] = 31

# 使用 get() 方法避免 KeyError
email = person.get('email', 'N/A')
print(email)  # N/A

# 遍历字典
for key, value in person.items():
    print(f"{key}: {value}")

# 字典推导式
squares = {x: x**2 for x in range(6)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 合并字典 (Python 3.5+)
dict1 = {'a': 1, 'b': 2}
dict2 = {'c': 3, 'd': 4}
merged = {**dict1, **dict2}
print(merged)  # {'a': 1, 'b': 2, 'c': 3, 'd': 4}`,
    language: 'python',
    description: 'Python 字典的常用操作，包括创建、访问、遍历和合并',
    tags: ['python', '字典', '数据结构', '基础']
  },

  {
    title: '文件读写',
    code: `# Python 文件读写操作

# 读取文件
# 方法 1: 一次性读取全部
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    print(content)

# 方法 2: 逐行读取
with open('file.txt', 'r', encoding='utf-8') as f:
    for line in f:
        print(line.strip())

# 方法 3: 读取所有行到列表
with open('file.txt', 'r', encoding='utf-8') as f:
    lines = f.readlines()
    print(lines)

# 写入文件
# 覆盖写入
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("Hello, World!\\n")

# 追加写入
with open('output.txt', 'a', encoding='utf-8') as f:
    f.write("This is a new line.\\n")

# 写入多行
lines = ["Line 1\\n", "Line 2\\n", "Line 3\\n"]
with open('output.txt', 'w', encoding='utf-8') as f:
    f.writelines(lines)

# 使用 JSON 格式读写
import json

# 写入 JSON
data = {'name': 'Alice', 'age': 30}
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取 JSON
with open('data.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print(data)`,
    language: 'python',
    description: 'Python 文件读写操作，包括文本文件和 JSON 文件的处理',
    tags: ['python', '文件', 'IO', 'json']
  },

  {
    title: '装饰器',
    code: `# Python 装饰器 - 在不修改函数代码的情况下扩展功能
import time
from functools import wraps

# 基本装饰器
def my_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# 输出:
# Before function call
# Hello!
# After function call

# 带参数的装饰器
def timer(func):
    @wraps(func)  # 保留原函数的元信息
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.4f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"

result = slow_function()
# 输出: slow_function took 1.0012 seconds

# 带参数的装饰器工厂
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

print(greet("Alice"))  # ['Hello, Alice!', 'Hello, Alice!', 'Hello, Alice!']`,
    language: 'python',
    description: 'Python 装饰器的使用，包括基本装饰器、带参数的装饰器和装饰器工厂',
    tags: ['python', '装饰器', '高级', '函数式编程']
  },

  {
    title: '上下文管理器',
    code: `# Python 上下文管理器 - 自动管理资源
from contextlib import contextmanager

# 使用 with 语句
# 标准 with 用法
with open('file.txt', 'r') as f:
    content = f.read()
# 文件会自动关闭，即使发生异常

# 自定义上下文管理器 (基于类)
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

# 使用 contextmanager 装饰器
@contextmanager
def custom_open(filename, mode):
    f = open(filename, mode)
    try:
        yield f
    finally:
        f.close()

with custom_open('file.txt', 'r') as f:
    print(f.read())

# 临时改变工作目录
@contextmanager
def change_directory(path):
    import os
    old_dir = os.getcwd()
    try:
        os.chdir(path)
        yield
    finally:
        os.chdir(old_dir)

with change_directory('/tmp'):
    print(os.getcwd())  # /tmp
print(os.getcwd())  # 恢复原目录`,
    language: 'python',
    description: 'Python 上下文管理器的使用，实现资源的自动管理和清理',
    tags: ['python', '上下文管理器', '资源管理', '高级']
  },

  {
    title: '异常处理',
    code: `# Python 异常处理
# 基本 try-except
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")  # Error: division by zero

# 多个 except 块
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("Invalid input! Please enter a number.")
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print(f"Result: {result}")  # 没有异常时执行
finally:
    print("Cleanup code here.")  # 总是执行

# 抛出异常
def validate_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    if age < 18:
        raise ValueError("Must be 18 or older")
    return True

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation error: {e}")

# 自定义异常
class CustomError(Exception):
    def __init__(self, message, code):
        self.message = message
        self.code = code
        super().__init__(self.message)

try:
    raise CustomError("Something went wrong", 500)
except CustomError as e:
    print(f"Error {e.code}: {e.message}")`,
    language: 'python',
    description: 'Python 异常处理机制，包括 try-except、抛出异常和自定义异常',
    tags: ['python', '异常处理', '错误处理', '基础']
  },

  {
    title: '类和继承',
    code: `# Python 类和继承
# 基本类定义
class Person:
    species = "Homo sapiens"  # 类属性

    def __init__(self, name, age):
        self.name = name  # 实例属性
        self.age = age

    def greet(self):
        return f"Hi, I'm {self.name}"

    def __str__(self):
        return f"Person(name={self.name}, age={self.age})"

# 继承
class Student(Person):
    def __init__(self, name, age, school):
        super().__init__(name, age)  # 调用父类构造
        self.school = school

    def greet(self):  # 方法重写
        return f"Hi, I'm {self.name} from {self.school}"

# 多继承
class Teacher:
    def teach(self):
        return "Teaching...".

class TeachingStudent(Student, Teacher):
    pass

# 使用示例
person = Person("Alice", 30)
print(person.greet())  # Hi, I'm Alice

student = Student("Bob", 20, "MIT")
print(student.greet())  # Hi, I'm Bob from MIT

ts = TeachingStudent("Carol", 25, "Stanford")
print(ts.teach())  # Teaching...
print(ts.greet())  # Hi, I'm Carol from Stanford

# 属性访问控制
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # 私有属性

    @property
    def balance(self):
        return self.__balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError("Balance cannot be negative")
        self.__balance = value

account = BankAccount(1000)
print(account.balance)  # 1000
account.balance = 2000`,
    language: 'python',
    description: 'Python 面向对象编程，包括类定义、继承、方法重写和属性控制',
    tags: ['python', '类', 'OOP', '面向对象']
  },

  {
    title: '生成器',
    code: `# Python 生成器 - 惰性求值的迭代器
# 生成器函数
def count_up_to(n):
    count = 1
    while count <= n:
        yield count
        count += 1

# 使用生成器
for num in count_up_to(5):
    print(num)  # 1, 2, 3, 4, 5

# 生成器表达式
squares = (x**2 for x in range(5))
print(list(squares))  # [0, 1, 4, 9, 16]

# 无限序列
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# 获取前 10 个斐波那契数
fib = fibonacci()
for _ in range(10):
    print(next(fib))  # 0, 1, 1, 2, 3, 5, 8, 13, 21, 34

# 生成器的优势：节省内存
# 传统方式：创建包含百万个数字的列表
# numbers = [x for x in range(1000000)]  # 占用大量内存

# 生成器方式：按需生成，几乎不占用内存
def generate_numbers(n):
    for i in range(n):
        yield i

# 实际应用：读取大文件
def read_large_file(filename):
    with open(filename, 'r') as f:
        for line in f:
            yield line.strip()

# 管道式生成器
def filter_even(numbers):
    for n in numbers:
        if n % 2 == 0:
            yield n

def square(numbers):
    for n in numbers:
        yield n ** 2

numbers = range(10)
result = square(filter_even(numbers))
print(list(result))  # [0, 4, 16, 36, 64]`,
    language: 'python',
    description: 'Python 生成器的使用，包括生成器函数、生成器表达式和管道操作',
    tags: ['python', '生成器', '迭代器', '高级']
  },

  {
    title: '多线程与多进程',
    code: `# Python 多线程与多进程
import threading
import multiprocessing
from concurrent.futures import ThreadPoolExecutor, ProcessPoolExecutor
import time

# 多线程 - 适合 I/O 密集型任务
def worker(name):
    print(f"Worker {name} starting")
    time.sleep(1)
    print(f"Worker {name} done")

# 使用 Thread
threads = []
for i in range(5):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

# 使用 ThreadPoolExecutor
with ThreadPoolExecutor(max_workers=3) as executor:
    futures = [executor.submit(worker, i) for i in range(3)]
    for future in futures:
        future.result()

# 多进程 - 适合 CPU 密集型任务
def cpu_bound_task(n):
    total = 0
    for i in range(n):
        total += i ** 2
    return total

# 使用 ProcessPoolExecutor
if __name__ == '__main__':
    with ProcessPoolExecutor() as executor:
        results = executor.map(cpu_bound_task, [10000, 20000, 30000])
        print(list(results))

# 线程间通信
queue = queue.Queue()

def producer():
    for i in range(5):
        queue.put(i)
        time.sleep(0.1)

def consumer():
    while True:
        item = queue.get()
        if item is None:
            break
        print(f"Consumed: {item}")

t1 = threading.Thread(target=producer)
t2 = threading.Thread(target=consumer)
t1.start()
t2.start()
t1.join()
t2.join()`,
    language: 'python',
    description: 'Python 并发编程，包括多线程、多进程和线程池的使用',
    tags: ['python', '并发', '多线程', '多进程']
  },

  {
    title: '数据类',
    code: `# Python dataclass - 自动创建特殊方法
from dataclasses import dataclass, field
from typing import List

# 基本用法
@dataclass
class Person:
    name: str
    age: int
    email: str = ""  # 默认值

# 自动生成 __init__, __repr__, __eq__ 等
person = Person(name="Alice", age=30, email="alice@example.com")
print(person)  # Person(name='Alice', age=30, email='alice@example.com')

# 不可变数据类
@dataclass(frozen=True)
class Point:
    x: float
    y: float

p = Point(1.0, 2.0)
# p.x = 2.0  # 会报错，因为是不可变的

# 字段默认值工厂函数
@dataclass
class Student:
    name: str
    grades: List[int] = field(default_factory=list)

student = Student(name="Bob")
print(student.grades)  # []

# 计算字段
@dataclass
class Circle:
    radius: float

    @property
    def area(self) -> float:
        return 3.14 * self.radius ** 2

circle = Circle(radius=5)
print(circle.area)  # 78.5

# 比较和排序
@dataclass(order=True)
class Employee:
    name: str
    salary: float

e1 = Employee("Alice", 50000)
e2 = Employee("Bob", 60000)
print(e1 < e2)  # True (比较 salary)`,
    language: 'python',
    description: 'Python dataclass 的使用，自动创建特殊方法，简化类的定义',
    tags: ['python', 'dataclass', '类', '数据结构']
  },

  {
    title: '类型注解',
    code: `# Python 类型注解
from typing import List, Dict, Optional, Union, Callable, TypeVar

# 基本类型注解
def greet(name: str) -> str:
    return f"Hello, {name}"

# 集合类型注解
def process_numbers(numbers: List[int]) -> Dict[str, int]:
    return {
        "sum": sum(numbers),
        "count": len(numbers)
    }

# Optional 类型
def find_user(user_id: int) -> Optional[str]:
    if user_id == 1:
        return "Alice"
    return None

# Union 类型
def parse_value(value: Union[str, int]) -> int:
    if isinstance(value, str):
        return int(value)
    return value

# Callable 类型
def apply_func(values: List[int], func: Callable[[int], int]) -> List[int]:
    return [func(x) for x in values]

result = apply_func([1, 2, 3], lambda x: x * 2)
print(result)  # [2, 4, 6]

# 泛型
T = TypeVar('T')

def first(items: List[T]) -> T:
    return items[0]

# 类型别名
UserId = int
UserData = Dict[str, Union[str, int]]

def get_user(user_id: UserId) -> UserData:
    return {"name": "Alice", "age": 30}

# 协议 (Protocol) - 结构化子类型
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
render(circle)  # Drawing circle`,
    language: 'python',
    description: 'Python 类型注解的使用，提高代码可读性和类型安全',
    tags: ['python', '类型注解', 'typing', '类型安全']
  }
];

// 批量创建代码片段
async function createSnippets() {
  for (const snippet of pythonSnippets) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippet),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Created: ${result.title}`);
      } else {
        const error = await response.json();
        console.error(`❌ Failed to create ${snippet.title}:`, error);
      }
    } catch (error) {
      console.error(`❌ Error creating ${snippet.title}:`, error.message);
    }
  }
  console.log('\\n🎉 All snippets processed!');
}

createSnippets();
