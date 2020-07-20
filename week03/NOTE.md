学习笔记

### 1. JS表达式 | 运算符和表达式

#### Atom

##### Grammar 

- Grammar Tree vs Priority
- Left hand side & Right hand side

##### Runtime

- Type Convertion
- Reference

##### Express

new.target https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new.target 

- Member

  - ```
    a.b
    a[b]
    foo`string`
    super.b
    super[`b`]
    new.target 
    new Foo()
    ```

- new 

  - new Foo

- Reference

  - Object
  - key
  - delete
  - assign

- Call

  - foo()

  - supper()

  - foo()['b']

  - foo().b

  - ```
    foo()`abc`
    ```

Example: new a()['b']  //new出来一个 a对象，访问b属性

- Update
  - a + +
  - a - -
  - --a
  - ++a

- Unary(单目运算符)
  - delete a.b
  - void foo()
  - typeof a
  - +a
  - -a
  - ~a(整数安慰取反)
  - !a
  - await a

- Exponental（Right）
  - **(乘方)

- Multiplicative
  - */%

- Additive
  - +-
- Shift
  - <<>> >>>
- Relationship
  - <> <= >= instanceof in

- Equality
  - = =
  - !=
  - ===
  - !==

- Bitwise
  - & ^ |

- Logical
  - &&
  - ||
- Conditional
  - ? :

###  2.JS表达式 | 类型转换

- undefined 与 null 相等；
- 字符串和 bool 都转为数字再比较；
- 对象转换成 primitive 类型再比较。

这样我们就可以理解一些不太符合直觉的例子了，比如：

- false == '0' **true**
- true == 'true' **false**
- [] == 0 **true**
- [] == false **true**
- new Boolean('false') == false **false**

这里不太符合直觉的有两点：

- 一个是即使字符串与 boolean 比较，也都要转换成数字；
- 另一个是对象如果转换成了 primitive 类型跟等号另一边类型恰好相同，则不需要转换成数字。

![](C:\Users\mi\Desktop\71bafbd2404dc3ffa5ccf5d0ba077720.jpg)

##### Unboxing

- ToPrimitive
- toString vs valueOf
- Symbol.toPRimitive

```javascript
var x = {}
var o ={
    toString(){return "2"},
    valueOf() {return 1},
    [Symbol.toPrimitive]() {return 3}
}
x[o] =1
console.log("x"+o) //x3
```

##### Boxing（基本类型转换为对应的对象）

| 类型    | 对象                    | 值          |
| ------- | ----------------------- | ----------- |
| Number  | new Number(1)           | 1           |
| String  | new String("a")         | "a"         |
| Boolean | new Boolean(true)       | true        |
| Symbol  | new Object(Symbol("a")) | Symbol("a") |

### 3.JS语句 | 运行时相关概念

#### Statement

##### Grammar

- 简单语句
  - **ExpressionStatement**
  - EmptyStatement
  - DebuggerStatement
  - ThrowStatement
  - ContinueStatement
  - BreakStatement
  - ReturnStatement
- 组合语句
  - BlockStatement {}
    - [[type]]:normal
    - [[value]]:--
    - [[target]]:--
  - ifStatement
  - SwitchStatement
  - IterationStatement
    - while()
    - do  while()
    - for(  ;  ;  )
    - for in 
    - for of
  - WithStatemetn
  - LabelledStatement
  - TryStatement
    - try(){} catch(){} finally{ }   (return 无法打断执行)
- 声明
  - FunctionDeclaration
    - function
    - function*
    - async function
    - async function*
    - var
    - **class**
    - **const**
    - **let**
  - GeneratorDeclaration
  - AsyncFunctionDeclaration
  - AsyncGeneratorDeclaration
  - VariableStatement
  - ClassDeclaration
  - LexicalDeclaration
    - const 
    - let

##### RunTime

- Completion Record
  - [[type]]:normal,break,continue,return,or throw
  - [[value]]:基本类型
  - [[target]]:lable
- Lexical Environment(词法环境)

##### 作用域

### 4.JS结构化 | 宏任务和微任务

#### JS执行粒度（运行时）

- 宏任务
- 微任务（Promise）
- 函数调用（Execution）
- 语句/声明 （Completion Record）
- 表达式（Reference）
- 直接量/变量/this ......

#### 事件循环

![image-20200718165951438](C:\Users\mi\AppData\Roaming\Typora\typora-user-images\image-20200718165951438.png)

### 5.JS结构化 | JS函数调用

##### Execution Context

i:0

- code evaluation state
- Function
- Script or Module
- **Generator**（ECMAScript Code Execution Context 里没有）
- Realm
- LexicalEnvironment
  - this
  - new.target
  - super
  - 变量
- VariableEnvironment
  - 历史的遗留包袱，仅仅用于处理var变量

ECMAScript Code Execution Context

Generation Execution Contexts

##### Function-Closuer（闭包）

[^闭包]: 能够引用封闭作用域中局部绑定的特定实例的功能被称为闭包。引用其周围局部作用域的绑定的一个函数称为一个闭包

```js
var y = 2;
function foo2(){
console.log(y);
}
export foo2;
```

```js
var y = 2;
function foo2(){
var z = 3;
return () => {
console.log(y, z);
} }
var foo3 = foo2();
export foo3;
```

###### Realm

