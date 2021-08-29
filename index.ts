import { OnTimeFunc, CubicList } from "./index.d"

export default class Index {

    private readonly cubicFunctions: CubicList = {
        'linear' : [0,0,1,1],
        'ease' : [.25,.1,.25,1],
        'ease-in' : [.42,0,1,1],
        'ease-out' : [0,0,.58,1],
        'ease-in-out' : [.42,0,.58,1],
    }

    private readonly refreshRateMs: number
    private readonly duration: number = 0 // ms
    private remained: number = 0
    private cubicBezierPoints: number[] = [0,0,1,1] // linear
    private timerInterval: ReturnType<typeof setTimeout> | null = null
    private onTimeFunc: OnTimeFunc | null = null
    private onEndFunc: Function | null = null

    private days: number = 0
    private hours: number = 0
    private minutes: number = 0
    private seconds: number = 0
    private ms: number = 0

    constructor(countdown: number, refreshRateMs: number = 50, cubicBezier: number[] | string | undefined = undefined) {
        this.duration = countdown
        this.refreshRateMs = refreshRateMs

        if ( cubicBezier ) {

            if ( typeof cubicBezier === 'string' ) {
                if (  this.cubicFunctions.hasOwnProperty(cubicBezier) ) {
                    this.cubicBezierPoints = this.cubicFunctions[cubicBezier]
                } else {
                    throw Error('Не верное название cubicBezier функции')
                }
            } else if ( Array.isArray(cubicBezier) ) {
                this.cubicBezierPoints = cubicBezier
            } else {
                this.cubicBezierPoints = this.cubicFunctions.linear
            }
        }

        this.remained = this.duration
    }

    private calcRemained() {

        let remained = this.remained

        this.days = Math.floor(remained / 86400000)
        remained -= this.days * 86400000

        this.hours = Math.floor(remained / 3600000)
        remained -= this.hours * 3600000

        this.minutes = Math.floor(remained / 60000)
        remained -= this.minutes * 60000

        this.seconds = Math.floor(remained / 1000)
        remained -= this.seconds * 1000

        this.ms = remained
    }

    private calcProgress() {
        let timeLeft = this.duration - this.remained
        let t = (timeLeft / (this.duration/100) ) / 100
        let x = this.cubicBezier(this.cubicBezierPoints, t)
        return x * 100
    }

    public setCubicBezierPoints(points: number[]) {

        this.cubicBezierPoints = points
    }

    public start() {
        this.timerInterval = setInterval(() => {

            this.remained -= this.refreshRateMs

            if ( this.remained <= 0 )
            {
                this.remained = 0

                this.stop()

                if ( this.onEndFunc ) {
                    this.onEndFunc()
                }
            }

            this.calcRemained()

            if ( this.onTimeFunc )
            {
                this.onTimeFunc(this.days, this.hours, this.minutes, this.seconds, this.ms, this.calcProgress())
            }

        }, this.refreshRateMs)
    }

    public stop() {
        if ( this.timerInterval ) {
            clearInterval(this.timerInterval)
        }
    }

    public onTime(func: OnTimeFunc) {
        this.onTimeFunc = func
        return this
    }

    public onEnd(func: Function) {
        this.onEndFunc = func
        return this
    }

    private cubicBezier(points: number[], t: number) : number {

        //let P1 = points[0]
        let P2 = points[1]
        //let p5 = points[2]
        let p6 = points[3]

        //let x1: Double = 1
        let y1 = 0

        //let x2: Double = 0
        let y2 = 1

        // let x = Math.pow(1-t, 3) * x1 + 3 * t * Math.pow(1-t, 2) * P1 + 3 * Math.pow(t, 2) * (1-t) * p5 + Math.pow(t, 3) * x2 // 0-1 as time
        let y = Math.pow(1-t, 3) * y1 + 3 * t * Math.pow(1-t, 2) * P2 + 3 * Math.pow(t, 2) * (1-t) * p6 + Math.pow(t, 3) * y2 // 0-1 as animate pos

        return y
    }
}
