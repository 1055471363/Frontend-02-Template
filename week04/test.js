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
    if (c === 'd')
        return fonundD
    else
        return start(c)
}

function fonundD(c) {
    if (c === 'e')
        return fonundE
    else
        return start(c)
}

function fonundE(c) {
    if (c === 'f')
        return end
    else
        return start(c)
}

console.log(match('I am abcdef'))