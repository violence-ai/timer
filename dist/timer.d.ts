import OnTimeFunc from "./interfaces/OnTimeFunc";
import Options from "./interfaces/Options";
export default class Timer {
    private readonly cubicFunctions;
    private readonly refreshRateMs;
    private readonly duration;
    private readonly cubicBezierPoints;
    private remained;
    private timerInterval;
    private onTimeFunc;
    private onEndFunc;
    private days;
    private hours;
    private minutes;
    private seconds;
    private ms;
    constructor(options: Options);
    start(): void;
    stop(): void;
    onTime(func: OnTimeFunc): this;
    onEnd(func: Function): this;
    private calcRemained;
    private static cubicBezier;
}
