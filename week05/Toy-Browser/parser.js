const css = require('css');

const layout = require('./layout')
let currentToken = null
let currentAttribute = null
let currentTextNode = null;
let stack = [{type: "document", children: []}]

let rules = [] //暂存css规则
function addCssRules(text) {
    let ast = css.parse(text)
    rules.push(...ast.stylesheet.rules)
}

//计算选择器与元素匹配
function match(element, selector) {
    if (!selector || !element.attributes)
        return false
    if (selector.charAt(0) === "#") {
        let attr = element.attributes.filter(attr => attr.name === "id")
        if (attr && attr.value === selector.replace("#", ''))
            return true
    } else if (selector.charAt(0) === ".") {
        let attr = element.attributes.filter(attr => attr.name === "class")
        if (attr && attr.value === selector.replace(".", ''))
            return true
    } else {
        if (element.tagName === selector) {
            return true
        }
    }
    return false
}

// 处理优先级 又叫权重,特指度  <CSS:The Definitive Guide> Page.105
function specificity(selector) {
    let p = [0, 0, 0, 0] //[inline,id,class,tagName]
    let selectParts = selector.split('')
    for (const part of selectParts) {
        if (part.charAt(0) === "#") {
            p[1] += 1
        } else if (part.charAt(0) === ".") {
            p[2] += 1
        } else {
            p[3] += 1
        }
    }

    return p
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0])
        return sp1[0] - sp2[0]

    if (sp1[1] - sp2[1])
        return sp1[1] - sp2[1]

    if (sp1[2] - sp2[2])
        return sp1[2] - sp2[2]

    return sp1[3] - sp2[3]
}

function computeCSS(element) {
    // console.log("compute CSS for Element", element)
    //获取父元素序列 先复制再颠倒
    let elements = stack.slice().reverse()
    if (!element.computedStyle)
        element.computedStyle = {}
    for (const rule of rules) {
        let selectorParts = rule.selectors[0].split(" ").reverse()
        if (!match(element, selectorParts[0]))
            continue

        let matched = false
        let j = 1 //当前选择器的位置  i 当前元素的位置
        for (let i = 0; i < element.length; i++) {
            if (match(elements[i], selectorParts[j])) {
                j++
            }
        }
        // 选择器是否都被匹配到
        if (j >= selectorParts.length)
            matched = true
        if (matched) {
            //如果匹配到 ,我们要加入  属性真是作用到元素上
            let sp = specificity(rule.selectors[0])
            // 生成computed属性
            let computedStyle = element.computedStyle
            for (const declaration of rule.declaration) {
                if (!computedStyle[declaration.property])
                    computedStyle[declaration.property] = {}
                if (!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                } else if (compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
            }
        }
    }
}

function emit(token) {
    let top = stack[stack.length - 1]

    if (token.type == 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }
        element.tagName = token.tagName
        for (const p in token) {
            if (p !== 'type' || p !== 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        computeCSS(element)
        top.children.push(element)
        // element.parent = top
        if (!token.isSelfClosing)
            stack.push(element)
        currentTextNode = null
    } else if (token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end doesn't match")
        } else {
            //添加css规则
            if (top.tagName === 'style') {
                addCssRules(top.children[0].content)
            }
            layout(top)
            stack.pop()

        }
        currentTextNode = null
    } else if (token.type === 'text') {
        if (currentTextNode == null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }

}

const EOF = Symbol("EOF")

function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if (c === EOF) {
        emit({
            type: 'EOF'
        })
        return;
    } else {
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}

function tagOpen(c) {
    if (c === '/') {
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        emit({
            type: 'text',
            content: c
        })
        return
    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '/') {
        return selfClosingStartTag //自封闭标签
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if (c === '>') {
        emit(currentToken)
        return data
    } else {
        currentToken.tagName += c
        return tagName
    }

}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {

    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '\u0000') {

    } else if (c === '\"' || c === "'" || c === '<') {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}


function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeValue
    } else if (c === "\"") {
        return doubleQuotedAttributeValue
    } else if (c === "\'") {
        return singQuotedAttributeValue
    } else if (c === '>') {

    } else {
        return unQuotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singQuotedAttributeValue(c) {
    if (c === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }

}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === "/") {
        return selfClosingStartTag
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentAttribute)
        return data
    } else if (c === EOF) {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function unQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if (c === '\u0000') {

    } else if (c === "\"" || c === "'" || c === "<" || c === "`") {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c
        return unQuotedAttributeValue
    }
}

function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true
        return data
    } else if (c === 'EOF') {

    } else {

    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c === '>') {

    } else if (c === EOF) {

    } else {

    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c = '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentAttribute)
        return data
    } else if (c === EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }

}

module.exports.parseHTML = function parseHTML(html) {
    let state = data
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF)
    return stack[0]
}
