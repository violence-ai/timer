export type ProgressData = {
    days: number
    hours: number
    minutes: number
    seconds: number
    ms: number
    progress: number
}

export default interface OnTimeFunc {
    (progressData: ProgressData): void
}