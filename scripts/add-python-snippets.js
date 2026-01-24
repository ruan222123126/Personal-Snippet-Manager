// 批量添加常用 Python 命令卡片
const API_URL = 'http://localhost:3002/api/snippets';

const pythonSnippets = [
  {
    title: '列表推导式',
    code: `# 基本列表推导式
squares = [x**2 for x in range(10)]

# 带条件的列表推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# 嵌套列表推导式
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]`,
    language: 'python',
    description: 'Python 列表推导式 - 快速创建列表的优雅方式',
    tags: ['python', '列表', '基础']
  },
  {
    title: '字典常用操作',
    code: `# 创建字典
dict1 = {'name': 'Alice', 'age': 25}

# 字典推导式
squares_dict = {x: x**2 for x in range(6)}

# 获取值（带默认值）
value = dict1.get('name', 'Unknown')

# 合并字典 (Python 3.9+)
dict2 = dict1 | {'city': 'Beijing'}

# 遍历字典
for key, value in dict1.items():
    print(f"{key}: {value}")`,
    language: 'python',
    description: 'Python 字典的常用操作和技巧',
    tags: ['python', '字典', '基础']
  },
  {
    title: '文件读写',
    code: `# 读取文件
with open('file.txt', 'r', encoding='utf-8') as f:
    content = f.read()
    # 或逐行读取
    # for line in f:
    #     print(line.strip())

# 写入文件
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write('Hello, World!')

# 追加到文件
with open('log.txt', 'a', encoding='utf-8') as f:
    f.write('New log entry\\n')`,
    language: 'python',
    description: 'Python 文件读写操作，使用 with 语句自动管理资源',
    tags: ['python', '文件', 'IO']
  },
  {
    title: '装饰器基础',
    code: `import functools
import time

# 计时装饰器
def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f} seconds")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"`,
    language: 'python',
    description: 'Python 装饰器 - 在不修改函数代码的情况下增强功能',
    tags: ['python', '装饰器', '高级']
  },
  {
    title: '类和面向对象',
    code: `class Person:
    # 类属性
    species = "Homo sapiens"

    def __init__(self, name, age):
        # 实例属性
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name}"

    def __str__(self):
        return f"Person({self.name}, {self.age})"

    @classmethod
    def from_birth_year(cls, name, birth_year):
        age = 2024 - birth_year
        return cls(name, age)

# 使用示例
person = Person("Alice", 25)
print(person.greet())`,
    language: 'python',
    description: 'Python 类的定义和使用，包括构造函数、实例方法和类方法',
    tags: ['python', '类', '面向对象']
  },
  {
    title: '异常处理',
    code: `try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"错误: {e}")
except ValueError as e:
    print(f"值错误: {e}")
except Exception as e:
    print(f"未知错误: {e}")
else:
    print("没有异常")
finally:
    print("无论如何都会执行")

# 自定义异常
class CustomError(Exception):
    pass

try:
    raise CustomError("自定义错误")
except CustomError as e:
    print(f"捕获到: {e}")`,
    language: 'python',
    description: 'Python 异常处理机制，包括 try-except-else-finally 和自定义异常',
    tags: ['python', '异常处理', '基础']
  },
  {
    title: 'Lambda 和高阶函数',
    code: `# Lambda 函数
multiply = lambda x, y: x * y
print(multiply(3, 4))  # 12

# map - 对每个元素应用函数
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))

# filter - 过滤元素
evens = list(filter(lambda x: x % 2 == 0, numbers))

# reduce - 累积计算
from functools import reduce
sum_all = reduce(lambda x, y: x + y, numbers)

# sorted with key
students = [('Alice', 25), ('Bob', 20), ('Charlie', 23)]
sorted_students = sorted(students, key=lambda x: x[1])`,
    language: 'python',
    description: 'Python 函数式编程工具：lambda、map、filter、reduce',
    tags: ['python', '函数式编程', '高级']
  },
  {
    title: '生成器',
    code: `# 生成器函数
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# 使用生成器
for num in fibonacci(10):
    print(num)

# 生成器表达式
squares_gen = (x**2 for x in range(1000000))

# 惰性求值，节省内存
first_five = [next(squares_gen) for _ in range(5)]

# 无限生成器
def count(start=0):
    n = start
    while True:
        yield n
        n += 1`,
    language: 'python',
    description: 'Python 生成器 - 使用 yield 实现惰性求值和节省内存',
    tags: ['python', '生成器', '高级']
  },
  {
    title: '上下文管理器',
    code: `# 自定义上下文管理器
class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        print(f"耗时: {self.end - self.start:.2f}秒")
        return False

# 使用自定义上下文管理器
with Timer():
    time.sleep(1)

# 使用 contextlib 简化
from contextlib import contextmanager

@contextmanager
def timer_context():
    start = time.time()
    yield
    end = time.time()
    print(f"耗时: {end - start:.2f}秒")

with timer_context():
    time.sleep(1)`,
    language: 'python',
    description: 'Python 上下文管理器 - 使用 with 语句管理资源',
    tags: ['python', '上下文管理器', '高级']
  },
  {
    title: '字符串处理',
    code: `text = "Hello, World!"

# 字符串格式化
name = "Alice"
age = 25
print(f"我的名字是 {name}，今年 {age} 岁")

# 常用字符串方法
text.lower()      # 转小写
text.upper()      # 转大写
text.strip()      # 去除首尾空白
text.split(',')   # 分割成列表
'-'.join(['a', 'b', 'c'])  # 连接字符串

# 正则表达式
import re
email = "user@example.com"
pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
if re.match(pattern, email):
    print("有效的邮箱地址")`,
    language: 'python',
    description: 'Python 字符串处理和格式化方法',
    tags: ['python', '字符串', '基础']
  },
  {
    title: '日期时间处理',
    code: `from datetime import datetime, timedelta

# 获取当前时间
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))

# 创建日期
date = datetime(2024, 1, 1, 12, 0)

# 时间加减
tomorrow = now + timedelta(days=1)
week_ago = now - timedelta(weeks=1)

# 时间差计算
diff = now - date
print(f"相差 {diff.days} 天")

# 解析字符串
str_date = "2024-01-01"
parsed_date = datetime.strptime(str_date, "%Y-%m-%d")

# 使用 dateutil (需要安装: pip install python-dateutil)
from dateutil import parser
flexible_date = parser.parse("January 1, 2024")`,
    language: 'python',
    description: 'Python 日期时间处理，使用 datetime 模块',
    tags: ['python', 'datetime', '时间']
  },
  {
    title: '虚拟环境管理',
    code: `# 创建虚拟环境
python -m venv myenv

# 激活虚拟环境
# Windows:
myenv\\Scripts\\activate
# Linux/Mac:
source myenv/bin/activate

# 退出虚拟环境
deactivate

# 导出依赖
pip freeze > requirements.txt

# 安装依赖
pip install -r requirements.txt

# 使用 pipenv (推荐)
pip install pipenv
pipenv install
pipenv shell`,
    language: 'bash',
    description: 'Python 虚拟环境管理命令，隔离项目依赖',
    tags: ['python', '环境', '命令行']
  }
];

async function addSnippet(snippet) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(snippet)
    });

    if (!response.ok) {
      console.error(`添加失败: ${snippet.title}`, await response.text());
      return false;
    }

    const data = await response.json();
    console.log(`✓ 已添加: ${snippet.title}`);
    return true;
  } catch (error) {
    console.error(`错误: ${snippet.title}`, error.message);
    return false;
  }
}

async function main() {
  console.log('开始添加 Python 代码片段...\n');

  let successCount = 0;
  let failCount = 0;

  for (const snippet of pythonSnippets) {
    const success = await addSnippet(snippet);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    // 避免请求过快
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log(`\n完成! 成功: ${successCount}, 失败: ${failCount}`);
}

main().catch(console.error);
