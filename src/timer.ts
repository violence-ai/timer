import CubicList from "./interfaces/CubicList";
import OnTimeFunc from "./interfaces/OnTimeFunc";
import Options from "./interfaces/Options";
import Bezier from "./interfaces/Bezier";

export default class Timer {

    private readonly cubicFunctions: CubicList = {
        'linear' : [0,0,1,1],
        'ease' : [.25,.1,.25,1],
        'ease-in' : [.42,0,1,1],
        'ease-out' : [0,0,.58,1],
        'ease-in-out' : [.42,0,.58,1],
    }

    private readonly refreshRateMs: number = 50 // ms
    private readonly duration: number = 0 // ms
    private readonly cubicBezierPoints: number[] = [0,0,1,1] // linear
    private remained: number = 0
    private timerInterval: ReturnType<typeof setTimeout> | null = null
    private onTimeFunc: OnTimeFunc | null = null
    private onEndFunc: Function | null = null

    private days: number = 0
    private hours: number = 0
    private minutes: number = 0
    private seconds: number = 0
    private ms: number = 0

    constructor(options: Options) {
        this.duration = options.duration
        this.remained = options.duration

        if ( options.refreshRateMs ) {
            this.refreshRateMs = options.refreshRateMs >= 5 ? options.refreshRateMs : 5 // min 5, otherwise there will be performance problems!
        }

        if ( options.cubicBezier ) {
            if ( typeof options.cubicBezier === 'string' ) {
                if ( this.cubicFunctions.hasOwnProperty(options.cubicBezier) ) {
                    this.cubicBezierPoints = this.cubicFunctions[options.cubicBezier]
                } else {
                    throw Error('Incorrect cubicBezier function name')
                }
            } else if ( Array.isArray(options.cubicBezier) ) {
                this.cubicBezierPoints = options.cubicBezier
            }
        }
    }

    public start() {

        let timingFunction = Timer.cubicBezier(this.cubicBezierPoints)

        this.timerInterval = setInterval(() => {

            this.remained -= this.refreshRateMs

            // if end
            if ( this.remained <= 0 )
            {
                // correct final value
                this.remained = 0

                // stop cycle
                this.stop()

                // if listen onEnd event
                if ( this.onEndFunc ) {
                    this.onEndFunc()
                }
            }

            // calc
            this.calcRemained()

            // if listen onTime event
            if ( this.onTimeFunc )
            {
                let t = ((this.duration - this.remained) / (this.duration/100) ) / 100 // 0-1

                this.onTimeFunc({
                    days: this.days,
                    hours: this.hours,
                    minutes: this.minutes,
                    seconds: this.seconds,
                    ms: this.ms,
                    progress: timingFunction(t) * 100 // 0-100
                })
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

    private static cubicBezier(points: number[]) {

        let p0 = { x: 0, y: 0 },
            p1 = { x: points[0], y: points[1] },
            p2 = { x: points[2], y: points[3] },
            p3 = { x: 1, y: 1 }

        let curve = function (p0: number, p1: number, p2: number, p3: number, t: number) {
            return (1-t)**3*p0 + 3*t*(1-t)**2*p1 + 3*t**2*(1-t)*p2 + t**3*p3
        }

        let bezier : Bezier = {}

        for ( let t=0; t<=1; t+=0.001 )
        {
            let x = curve(p0.x, p1.x, p2.x, p3.x, t) // 0-1 time
            let y = curve(p0.y, p1.y, p2.y, p3.y, t) // 0-1 animate

            bezier[x.toFixed(3)] = y
        }

        return function (t: number) {

            return bezier[t.toFixed(3)]
        }
    }
}