import { content, clock } from '~/src/logic/elements';
import { getStart, getClockLength, getTimerRef } from './logic/state';
import { msToTime } from './logic/util';

if (content && clock) {
  clock!.textContent = msToTime(getClockLength());
  setInterval(() => {
    if (getTimerRef().isRunning) {
      const start = getStart();
      const now = Date.now();

      const timeRemaining = getClockLength() - (now - start);

      clock!.textContent = msToTime(timeRemaining);
    }
  }, 1000);
}
