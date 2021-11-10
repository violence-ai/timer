import {ProgressData} from "../types/ProgressData";

export default interface OnTimeFunc {
    (progressData: ProgressData): void
}