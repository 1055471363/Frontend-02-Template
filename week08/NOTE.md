学习笔记

## HTML 语义化标签

```html
<article>
<aside>
<details>
<figcaption>
<figure>
<footer>
<header>
<main>
<mark>
<nav>
<section>
<summary>
<time>
```

## Document 接口

### 属性

- body
- characterSet
- childElementCount
- children
- doctype
- documentElement
- domain
- fullscreen
- head
- hidden
- images
- links
- location
- onxxxxxxxxx
- origin
- plugins
- readyState
- referrer
- scripts
- scrollingElement
- styleSheets
- title
- visibilityState

方法：

- close()
- createDocumentFragment()
- createElement()
- createTextNode()
- execCommand()
- exitFullscreen()
- getElementById()
- getElementsByClassName()
- getElementsByName()
- getElementsByTagName()
- getSelection()
- hasFocus()
- open()
- querySelector()
- querySelectorAll()
- registerElement()
- write()
- writeln()



### Event:冒泡与捕获

- 事件捕获阶段：事件从祖先元素往子元素查找（DOM树结构），直到捕获到事件目标 target。在这个过程中，默认情况下，事件相应的监听函数是不会被触发的。
- 事件目标：当到达目标元素之后，执行目标元素该事件相应的处理函数。如果没有绑定监听函数，那就不执行。
- 事件冒泡阶段：事件从事件目标 target 开始，从子元素往冒泡祖先元素冒泡，直到页面的最上一级标签。

### Range

```
Range API
• var range = new Range()
• range.setStart(element, 9)
• range.setEnd(element, 4)
• var range = document.getSelection().getRangeAt(0);

• range.setStartBefore
• range.setEndBefore
• range.setStartAfter
• range.setEndAfter
• range.selectNode
• range.selectNodeContents

• var fragment = range.extractContents()
• range.insertNode(document.createTextNode("aaaa"))
```

### CSSOM

```
Rules
• document.styleSheets[0].cssRules
• document.styleSheets[0].insertRule("p { color:pink; }", 0)
• document.styleSheets[0].removeRule(0)

• CSSStyleRule
• CSSCharsetRule
• CSSImportRule
• CSSMediaRule
• CSSFontFaceRule
• CSSPageRule
• CSSNamespaceRule
• CSSKeyframesRule
• CSSKeyframeRule
• CSSSupportsRule
• ......

• CSSStyleRule
• selectorText String
• style K-V结构

getComputedStyle
• window.getComputedStyle(elt, pseudoElt);
• elt 想要获取的元素
• pseudoElt 可选，伪元素
```

```
window
• window.innerHeight, window.innerWidth
• window.outerWidth, window.outerHeight
• window.devicePixelRatio
• window.screen
• window.screen.width
• window.screen.height
• window.screen.availWidth
• window.screen.availHeight

• window.open("about:blank", "_blank"
,"width=100,height=100,left=100,right=100" )
• moveTo(x, y)
• moveBy(x, y)
• resizeTo(x, y)
• resizeBy(x, y)

scroll • scrollTop • scrollLeft • scrollWidth • scrollHeight • scroll(x, y) • scrollBy(x, y) • scrollIntoView()
• window • scrollX • scrollY • scroll(x, y) • scrollBy(x, y)


layout
• getClientRects()
• getBoundingClientRect()
```

