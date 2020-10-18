const TICK = Symbol("tick")
const TICK_HANDLER = Symbol("tick-handler") //Symbol 防止外部调用 唯一性
const ANIMATIONS = Symbol("animations")
const START_TIME = Symbol("start-time")
const PAUSE_START = Symbol("pause-start")
const PAUSE_TIME = Symbol("pause-time")
export class TimeLine {
    constructor() {
        this.state = 'Inited'
        this[ANIMATIONS] = new Set()
        this[START_TIME] = new Map()
    }
    start() {
        if(!this.state === 'Inited') return
        this.state = 'started'
        this[PAUSE_TIME] = 0
        let startTime = Date.now()
        this[TICK] = () => {
            let now = Date.now()
            for (const animation of this[ANIMATIONS]) {
                let t
                if (this[START_TIME].get(animation) < startTime)
                    t = now - startTime - this[PAUSE_TIME] - animation.delay
                else
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME] - animation.delay
                if (animation.duration < t) {
                    this[ANIMATIONS].delete(animation)
                    t = animation.duration
                }
                if (t > 0)
                    animation.receive(t)
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK])
        }
        this[TICK]()
    }
    // set rate(){}
    // get rate(){}
    pause() {
        if(this.state !== 'started') return
        this.state = 'paused'
        this[PAUSE_START] = Date.now()
        cancelAnimationFrame(this[TICK_HANDLER])
    }
    resume() {
        if(this.state !== 'paused') return
        this.state = 'started'
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START]
        this[TICK]()
    }
    reset() {
        this.pause()
        this.state = 'Inited'
        this[PAUSE_TIME] = 0
        let startTime = Date.now()
        this[ANIMATIONS] = new Set()
        this[START_TIME] = new Map()
        this[TICK_HANDLER] = 0
        this[PAUSE_START] = null
    }
    add(animation, startTime) {
        if (arguments.length < 2) startTime = Date.now()
        this[ANIMATIONS].add(animation)
        this[START_TIME].set(animation, startTime)
    }
    remove() {}
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFuntion, template) {
        timingFuntion = timingFuntion || (v => v)
        template = template || (v => v)
        this.object = object
        this.property = property
        this.startValue = startValue
        this.endValue = endValue
        this.duration = duration
        this.timingFuntion = timingFuntion
        this.delay = delay
        this.template = template
    }
    receive(time) {
        let range = (this.endValue - this.startValue)
        let progress = this.timingFuntion(time / this.duration)
        this.object[this.property] = this.template(this.startValue + range * progress)
    }
}