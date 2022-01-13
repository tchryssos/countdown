import { minutesToMillis } from './util';

let start = Date.now();
export const getStart = () => start;
export const setState = (newTime: number) => (start = newTime);

let clockLength = minutesToMillis(20);
export const getClockLength = () => clockLength;
export const setClockLength = (newLength: number) => (clockLength = newLength);

let timerRef = { isRunning: false };
export const getTimerRef = () => timerRef;
export const setTimerIsRunning = (isRunning: boolean) =>
  (timerRef.isRunning = isRunning);
