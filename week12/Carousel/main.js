import {
    Component,
    createElement
} from './framework.js'

class Carousel extends Component {
    constructor() {
        super()
        this.attributes = Object.create(null) //存attributes
    }

    setAttribute(name, value) {
        this.attributes[name] = value
    }

    render() {
        this.root = document.createElement("div")
        this.root.classList.add("carousel")
        for (const record of this.attributes.src) {
            let child = document.createElement("div")
            child.style.backgroundImage = `url('${record}')`
            this.root.appendChild(child)
        }

        let position = 0
        this.root.addEventListener("mousedown", event => {
            let children = this.root.children
            let startX = event.clientX
            let move = event => {   
                let x =event.clientX-startX
                let current = position -((x-x%500)/500)
                for (const offset of [-2,1,0,1,-1]) {
                    let pos = current +offset
                    pos = (pos + children.length)%children.length
                    children[pos].style.transition = 'none'
                    children[pos].style.transform = `translateX(${-pos*500 +offset*500+x%500}px)`
                }
            }
            let up = event => {
                let x =event.clientX-startX
                position = position- Math.round(x/500)
                for (const offset of [0,-Math.sign(Math.round(x/500)-x+250*Math.sign(x))]) {
                    let pos = position +offset
                    pos = (pos + children.length)%children.length
                    children[pos].style.transition = 'none'
                    children[pos].style.transform = `translateX(${-pos*500 +offset*500}px)`
                }
                document.removeEventListener("mousemove", move)
                document.removeEventListener("mouseup", up)
            }
            document.addEventListener("mousemove", move)
            document.addEventListener("mouseup", up)
        })

        /*let currentIndex = 0
        setInterval(()=>{
            let children = this.root.children
            let nextIndex = (currentIndex+1) %children.length
            let current =children[currentIndex]
            let next = children[nextIndex]

            next.style.transition = "none"
            next.style.transform = `translateX(-${100-nextIndex*100}%)`
            setTimeout(()=>{
                next.style.transition = ""  //css里的生效
                current.style.transform =`translateX(-${-100-currentIndex*100}%)`
                next.style.transform =`translateX(${-nextIndex*100}%)`
                currentIndex = nextIndex
            },16)
        },3000)*/
        return this.root
    }

    mountTo(parent) {
        parent.appendChild(this.render())
    }
}

let d = [
    "http://art25.photozou.jp/pub/530/263530/photo/54773394.jpg",
    "https://ranking.xgoo.jp/tool/images/column/2020/01/0128_9.jpg",
    "http://i2.sinaimg.cn/bj/p/2008-07-28/U2285P52T4D174043F159DT20080728173551.jpg",
    "https://tse3-mm.cn.bing.net/th/id/OIP.dmeW_ZESlpuSd0OHXABX3wHaFG?pid=Api&rs=1"
]
// document.body.appendChild(a)
let a = <Carousel src={d}/>;
a.mountTo(document.body)
