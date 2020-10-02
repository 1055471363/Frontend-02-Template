import {
    TimeLine,
    Animation
} from './animation.js'

import {
    ease,easeIn
}
from './ease.js'
let tl = new TimeLine()
tl.start()
tl.add(new Animation(document.querySelector('#el').style, "transform", 0, 500, 4000, 0, easeIn, v => `translateX(${v}px)`))
document.querySelector('#el2').style.transition = 'transform ease-in 4s'
document.querySelector('#el2').style.transform ='translateX(500px)'

document.querySelector('#pause-btn').addEventListener("click", () => tl.pause())
document.querySelector('#resume-btn').addEventListener("click", () => tl.resume())