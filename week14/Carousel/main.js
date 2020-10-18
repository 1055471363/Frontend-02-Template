import {
    Component,
    createElement
} from './framework.js'
import {
    Carousel
} from './carousel.js'
import {
    TimeLine,
    Animation
} from './animation.js'


let d = [
    "http://art25.photozou.jp/pub/530/263530/photo/54773394.jpg",
    "https://ranking.xgoo.jp/tool/images/column/2020/01/0128_9.jpg",
    "http://i2.sinaimg.cn/bj/p/2008-07-28/U2285P52T4D174043F159DT20080728173551.jpg",
    "https://tse3-mm.cn.bing.net/th/id/OIP.dmeW_ZESlpuSd0OHXABX3wHaFG?pid=Api&rs=1"
]
// document.body.appendChild(a)
let a = <Carousel src={d}/>;
a.mountTo(document.body)

// let tl = new TimeLine()
// window.tl = tl
// window.animation = new Animation({
//     set a(v) {
//         console.log(v)
//     }
// }, "a", 0, 100, 1000, null)
// tl.start()