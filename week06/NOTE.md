#### CSS总体结构

- @charset
- @import
- rules
- @media
- @page
- **rule**

##### At-rules

-  @charset ： https://www.w3.org/TR/css-syntax-3/
-  @import ：https://www.w3.org/TR/css-cascade-4/
-  **@media** ：https://www.w3.org/TR/css3-conditional/
-  @page ： https://www.w3.org/TR/css-page-3/
-  @counter-style ：https://www.w3.org/TR/css-counter-styles-3 
-  **@keyframes** ：https://www.w3.org/TR/css-animations-1/
-  **@fontface** ：https://www.w3.org/TR/css-fonts-3/
-  @supports ：https://www.w3.org/TR/css3-conditional/
-  @namespace ：https://www.w3.org/TR/css-namespaces-3/

##### CSS规则

-  Selector
    -  https://www.w3.org/TR/selectors-3/
    -  https://www.w3.org/TR/selectors-4/
-  Key
    -  Properties
    -  Variables: https://www.w3.org/TR/css-variables/
-  Value
    -  https://www.w3.org/TR/css-values-4/

选择器语法

-  简单选择器
    -  * 
    -  div svg|a
    -   .cls 
    -  #id 
    -  [attr=value] 
    -  :hover 
    -  ::before

##### 特指度

 * 每个id+0,1,0,0

 * 每个类属性值，属性选择或伪类+0,0,1,0

 * 每个元素和伪元素+0,0,0,1

 * 连接符符通用选择符不增加特指度

```CSS
div#a.b .c[id=x]       [0,1,3,1]
 #a:not(#b)             [0,2,0,0]
  *.a                    [0,0,1,0]
  div.a                  [0,0,1,1]
```

##### 伪类

- 拼接伪类

    - a:link:hover {color:red;}

- 结构伪类

    - 选择根元素

        - :root

    - 选择空元素

        - :empty

    - 选择唯一的子代

        - ```css
            p:only-child{
            background:#ff0000;
            }
            
            p:only-of-type
            ```

    - 选择第一个和最后一个子代

        - :first-child
        - :last-child

    - 选择第一个和最后一个某种元素

        - table:first-of-type
        - table:last-of-type

    - 选择每第n个子元素

        - p:nth-child(1) = :first-child
        - ul > li:nth-child(3n+1)
        - :nth-last-child(1)  =:last-child 从后往前数

    - 选择每第n个某种元素

        - p > a:nth-of-type(even){}

- 动态伪类

    - 链接伪类 (使用之后无法更改文字颜色之外的属性)
        - :link
        - :visited
        - :any-link  = :link 和:visited
        - :active
    - 用户操作伪类
        - :focus
        - :hover
        - :acyive

- UI状态伪类

    - 启用和禁用的UI元素
        - :enable
        - :disable
    - 选择状态
        - :checked
        - :indeterminate
    - 默认选项伪类
        - :default
    - 可选性伪类
        - :required
        - :optional
    - 有效性伪类
        - :valid
        - :invalid
    - 范围伪类
        - :in-range  (HTML,min 和max 之内)
        - :out-of-range  (用户输入的值小于控件接受的最小值和最大值)
    - 可变性伪类
        - :read-write
        - :reaf-only

- :target伪类

- :lang伪类

- 逻辑型伪类(基本实现的不好)

    - :not
    - :where  :has

##### 伪元素

- ::first-letter
- ::first-line
- ::before
- ::after

思考题:为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

 first-letter是一段文字中的第一个字,它的内容是确定的,

first-line 是第一行字,第一行字的内容都不确定,根据父级容器的宽度不同,第一行字的内容随时都有可能变化,

而在某种程度上,浮动额元素脱离了常规的文档流,不过对布局仍有影响,

所以 first-letter 可以设置 float 之类的，而 first-line 不行