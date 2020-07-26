function match(string) {
    let state = start
    for (const c of string) {
        state = state(c)
        console.log(state)
    }
    return state === end
}

function start(c) {
    if (c === 'a')
        return fonundA
    else
        return start
}

function end(c) {
    return end
}

function fonundA(c) {
    if (c === 'b')
        return fonundB
    else
        return start(c)
}

function fonundB(c) {
    if (c === 'c')
        return fonundC
    else
        return start(c)
}

function fonundC(c) {
    if (c === 'a')
        return fonundA2
    else
        return start(c)
}

function fonundA2(c) {
    if (c === 'b')
        return fonundB2
    else
        return start(c)
}

function fonundB2(c) {
    if (c === 'x')
        return end
    else
        return fonundB(c)
}

console.log(match('abcabx'))