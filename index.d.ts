interface OnTimeFunc {
    (days: number, hours: number, minutes: number, seconds: number, ms: number, progress: number) : void
}

interface CubicList {
    [key: string] : number[]
}

export {
    OnTimeFunc, CubicList
}
