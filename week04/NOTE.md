学习笔记

## 浏览器总论 | 浏览器工作原理总论

#### 浏览器

1. 浏览器首先使用 HTTP 协议或者 HTTPS 协议，向服务端请求页面；
2. 把请求回来的 HTML 代码经过解析，构建成 DOM 树；
3. 计算 DOM 树上的 CSS 属性；
4. 最后根据 CSS 属性对元素逐个进行渲染，得到内存中的位图；
5. 一个可选的步骤是对位图进行合成，这会极大地增加后续绘制的速度；
6. 合成之后，再绘制到界面上。

#### 有限状态机处理字符串

##### 有限状态机

- 每一个状态都是一个机器

  - 在每一个机器里，我们可以做计算、存储、输出......

  - 所有的这些机器接受的输入是一致的

  - 状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应

    该是纯函数（无副作用） 

- 每一个机器知道下一个状态

  - 每个机器都有确定的下一个状态（Moore）
  - 每个机器根据输入决定下一个状态（Mealy）

##### JS中的有限状态机（Mealy）

```javascript
//每个函数是一个状态
function state(input) {  //函数参数就是输入
    //在函数中，可以自由的 编写代码，吹每个状态的逻辑
    return next; //返回值作为下一个状态
}

while (input) {
    //获取输入
    state = state(input)//把状态机的返回值作为下一个状态
}
```



##### 不使用有限状态机处理字符串

```javascript
//在一个字符串中，找到字符”a
function match(str) {
    for (const s of str) {
        if (s === 'a')
            return true
    }
    return false
}

console.log(match('I am groot'))
```

```javascript
//在一个字符串中，找到字符“ab
//我的实现
function findStr(input) {
    for (let index = 0; index < input.length; index++) {
        if (input[index] === 'a' && input[index + 1] === 'b')
            return true
    }
    return false
}java

console.log(findStr('I am  a  abbc'))
//老师的实现
function match(string){
    let foundA = false
    for(let c of string){
        if(c === 'a')
            foundA = true
        else if(foundA && c ==='b')
            return true
        else
            foundA = false
    }
    return false
}
//在一个字符串中，找到字符“abcdef”
```

