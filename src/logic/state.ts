import { minutesToMillis } from './util';

let start = Date.now();
export const getStart = () => start;
export const setStart = (newTime: number) => (start = newTime);

let clockLength = minutesToMillis(0.1);
export const getClockLength = () => clockLength;
export const setClockLength = (newLength: number) => (clockLength = newLength);

let timerRef = { isRunning: false };
export const getTimerRef = () => timerRef;
export const setTimerIsRunning = (isRunning: boolean) =>
  (timerRef.isRunning = isRunning);
