- ## 一、语言按照语法分类

  ### 1、非形式语言：中文 英文

  ### 2、形式语言：乔姆斯基谱系（四种文法 上下文包含文法）

  - 0型 无限制文法
  - 1型 上下文相关文法
  - 2型 上下文无关文法
  - 正则文法

  ## 二 产生式（BNF）

  巴科斯诺尔范式：即巴科斯范式（英语：Backus Normal Form，缩写为 BNF）是一种用于表示上下文无关文法（2型）的语言，上下文无关文法描述了一类形式语言。它是由约翰·巴科斯（John Backus）和彼得·诺尔（Peter Naur）首先引入的用来描述计算机语言语法的符号集。

  BNF表示语法规则的方式为：非终结符用尖括号括起。每条规则的左部是一个非终结符，右部是由非终结符和终结符组成的一个符号串，中间一般以“：：=”分开。具有相同左部的规则可以共用一个左部，各右部之间以直竖“|”隔开。

  产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句

  - 用尖括号括起来的名称来表示语法结构名
  - 语法结构分成基础机构和需要用其他语法结构定义的复合结构

  - - 基础结构终结符 

  - - 复合结构非终结符

  - 引号和中间的字符表示终结符
  - 可以有括号
  - *表示重复多次
  - | 表示或
  - +表示至少一次
  - ::= 是“被定义为”的意思。

  ### 终结符：

  - Number
  - \+ - * /

  ### 非终结符

  - MultiplicativeExpression
  - AdditiveExpression

   BNF 表示的四则运算 加减 乘除

  定义一个数字

  <Number> = "0" | "1" | "2" .....| "9"

  定义一个十进制数
  <DecimalNumber> = "0" | (("1" | "2" .....| "9") <Number>* )

  加法

  <AdditiveExpression> ::= <DecimalNumber> + <DecimalNumber>

  <MultiplicativeExpression> :: = <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber> | <MultiplicativeExpression> / <DecimalNumber> 

  <AdditiveExpression> ::= <MultiplicativeExpression> | <AdditiveExpression> "+" <MultiplicativeExpression> | <AdditiveExpression> "/" <MultiplicativeExpression>

  BNF 带括号的四则运算

  括号
  <PrimaryExpression> = <DecimalNumber> | "(" <LogicalExpress> ")"

  \+ -
  <AdditiveExpression> = <PrimaryExpression> | <AdditiveExpression> "+" <PrimaryExpression> | <AdditiveExpression> "-" <PrimaryExpression> 

  \* /
  <MultiplicativeExpression> = <DecimalNumber> | <MultiplicativeExpression> "*" <DecimalNumber> |<MultiplicativeExpression> "/" <DecimalNumber>

  四则表达式
  <LogicalExpress> = <DecimalNumber> | <LogicalExpress> "||" <AdditiveExpression> | <LogicalExpress> "&&" <AdditiveExpression>

  产生式： 在计算机中指 Tiger 编译器将源程序经过词法分析（Lexical Analysis）和语法分析（Syntax Analysis）后得到的一系列符合文法规则（Backus-Naur Form，BNF）的语句

  ### 通过产生式理解乔姆斯基谱系

  - 0型无限制文法
    - ？:: =? <a> <b> ::= "c" <d>
  - 1型上下文相关法 VB JavaScript Python
    - ?<A> ?::=? <B> ? <a> <b> <c> ::= <a> "c" <b> 只有中间那个可以变

  ​       "'''四则运算\n" <LogicalExpress> "'''" = "'''四则运算" ( <LogicalExpress> = <DecimalNumber> | <LogicalExpress> "||" <AdditiveExpression> |　<LogicalExpress> "&&" <AdditiveExpression>) "'''"

  - 2型上下文无关法
    - <A>::=?
  - 3型正则文法（表达式）
    - <A>::=<A>?
    - <A>::=?<A> 不正确

  JavaScript 总体上属于上下文无关文法 表达式大部分属于正则文法，有两个特例 **（乘方） 是右结合 不属于正则 属于2型

  {
  get a{ return1},
  get:1
  }
  属于1型文法

   

  ## 三、现代语言的特例

  - C++中，*可能表示乘号或者指针，具体是哪个，取决星号前面的标示符是否被声明为类型
  - VB中，<可能是小于号,也可能是XML直接量的开始，取决于当前位置是否可以接受XML直接量
  - Python中，行首的Tab符和空格会根据上一行的行首空白以一定的规则被处理成虚拟终结符indent或者dedent
  - JavaScript中，/可能是除号，也可能是正则表达式的开头，除理方式类似于VB，字符串模板中也需要特殊处理}，还有自动插入分号

  ## 四、编程语言的分类

  - 形式语言-用途 
    - 数据描述语言 JSON 、HTML、XAML、SQL、CSS 
    - 编程语言： C++、C、Java、C#、Python、Ruby、Perl、Lisp、T-SQL、Clojure、Haskel、JavaScript    
  - 形式语言-表达方式 

  1. 声明式语言 JSON 、HTML、XAML、SQL、CSS 、Lisp、Clojure、Haskel
  2. 命令型语言： C++、C、Java、C#、Python、Ruby、Perl、T-SQL、JavaScript 

   

  ## 五、编程语言的性质

  ## 图灵完备性

  - - 命令式 -图灵机
      - goto
      - if和while
    - 声明式 -lambda
    - 递归

  ## 动态与静态

  - - ### 动态：

      - 在用户的设备/在线上服务器上
      - 产品运行时
      - Runtime

    - ### 静态

      - 在程序员的设备上
      - 产品开发时
      - Compiletime

  ### 类型系统

   

  - - 动态类型系统与静态类型系统
      - 动态类型系统（JavaScript）
      - 静态类型系统 C++
    - 强类型与弱类型
      - String + Number
      - String == Boolean
    - 复合类型
      - 结构体{ a:t1,b:t2}
      - 函数签名 参数类型（列表）和返回值类型 (T1,T2)=>T3
    - 子类型

  - 泛型 逆变与协变 

   - - 凡是能用Array<Parent> 的地方都能用Array<Child> （协变）
      - 凡是能用Funtion<Child> 的地方都能用Funtion<Parent> （逆变）

  ## 一般命令式编程语言的设计方式

  ### Atom(原子级) 最小的组成单位 通常包含关键字 直接量 变量名一些基本的单位称为原子

  - Indetifier 变量名
  - Literal 直接量 数字直接量和字符串直接量

  ### Expression（表达式） 原子级的结构通过运算符相连接，加上一些辅助的符号，构成表达式，通常是一个可以级联的结构

  - Atom 原子
  - Operator 运算符 （javascript为例）
    - 算数运算符 + - * / % ++ --
    - 赋值运算符 = += -+ *= /= %=
    - 比较运算符 == === != !== > < >= <= ?
    - 逻辑运算符 && || !
    - 类型运算符 typeof(返回变量的类型) instanceof(返回 true，如果对象是对象类型的实例。)
    - 位运算符 & | ~(非) ^(异或) <<(零填充左位移) >>(有符号右位移) >>> (零填充右位移)
  - Punctuator 特定的符号

  ### Statement语句 if while for 语句

  - Expression
  - Keyworld
  - Punctuator

  ### Structure结构化

  - Function
  
    Class
  - Process 线程
- Namespace （c++）
  
### Program工程 npm

  - Promgram
  - Module
  - Package
  - Library



## JS类型|number

### Atom

#### Grammar

- Literal
- Variable
- Keywords
- Whitespace
- Line Terminator

#### Runtime

- Types
- Execution Context

#### Types

- **Number**

- **String**

- **Boolean**

- **Object**

- **Null**

- Undefined

- Symbol

  #### Number

  - IEE 754 Double Float（双精度浮点类型）
    - Sign (1) 符号位
    - Exponent(11) 指数位
    - Fraction(52)  精度位

  #### Number-Grammar

  - DecimalLiteral(10)
    - 0
    - 0.
    - .2
    - 1e3
  - BinaryIntegerLiyeral(2)
    - 0b111
  - OctalIntegerLiteral(8)
    - 0o10
  - HexIntegerLiteral(16)
    - 0xFF

# JS 类型 | String

### String

- Character
- Code Point
- Encoding
- ASCII ()
- Unicode
- UCS
- GB
  - GB2312
  - GBK(GB13000)
  - GB18030
- ISO-8859
- BIG5

### String-Encoding

- UTF
  - UTF8
  - UTF16

```javascript
//写一段 JS 的函数，把一个 string 它代表的字节给它转换出来，用 UTF8 对 string 进行遍码
functtion UTF8_Encoding(String){
    
}
```

#### String-Grammar

- "abc"
-  'abc' 
- ` abc `    

NUll & Undefined（）

Undefined 全局变量，推荐用 void 0 代替



#  JS对象 | 对象的基础知识

万物皆对象





# JS对象 | JS中的对象

### 原型

- *原型：原型是另一个用作属性后背源的对象*
- *原型链：当一个对象收到一个对他没有的属性的请求时，将到他的原型的原型那里搜索这个属性，然后是原型的的原型，以此类推*
- *{} 的原型： Object.prototype*



`JavaScript用属性来统一抽象对象状态和行为`



### Data Property（数据属性）

- [[value]]
- writable
- enumerable
- configurable

1. `数据属性有是否可写的特征值，以及是否可以被改变的特征值，`
2. `configurable设置为false之后，configurable/enumerable/writable都变为不可更改`
3. `writable设置为false之后，点运算无法更改，可以通过definProperty 去修改writable，强行把数据的可更改`

### Accessor Property（访问器属性）

- get
- set
- enumerable
- configurable

1. `enumerable主要影响Object.keys()这些内置函数的行为，也会影响forEach`

2. `一般来说，数据属性用于描述状态，访问器属性则用于描述行为`

3. `数据属性中如果存储函数，也可以用于描述行为`

   

#### Object API/Grammar

- {} . [] Object.definProperty 
- Object.create/Object.setPropertyOf/Object.getPropertyOf (基于原型的对象API)
- new / class / extends  (基于分类)
- new / function /prototype （减少使用）

#### Function Object

1. 除了一般对象的属性和原型，函数对象还有一个行为[[call]]
2. 用JavaScript中的function关键字，箭头运算符或者Function构造器创建的对象，会有[[call]]这个行为
3. 用类似f()这样的语法把对象当做函数调用时，会访问到[[call]]这个行为。
4. 如果对应的对象没有call行为，则会报错

#### Special Object  

Array [[length]]  Object.prototype[[setPrototypeOf]]

##### Host Object

Object[[call]] [[construct]]  私有方法 存在于运行时

- 宿主对象（host Objects）：由 JavaScript 宿主环境提供的对象，它们的行为完全由宿主环境决定。

- 内置对象（Built-in Objects）：由 JavaScript 语言提供的对象。

  - 固有对象（Intrinsic Objects ）：由标准规定，随着 JavaScript 运行时创建而自动创建的对象实例。	
  - 原生对象（Native Objects）：可以由用户通过 Array、RegExp 等内置构造器或者特殊语法创建的对象。

  - 普通对象（Ordinary Objects）：由{}语法、Object 构造器或者 class 关键字定义类创建的对象，它能够被原型继承。

# 