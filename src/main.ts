import { content, clock, clockWrapper } from '~/src/logic/elements';
import {
  getStart,
  getClockLength,
  getTimerRef,
  setTimerIsRunning,
} from './logic/state';
import { msToTime } from './logic/util';

if (content && clock && clockWrapper) {
  clock!.textContent = msToTime(getClockLength());

  setInterval(() => {
    if (getTimerRef().isRunning) {
      const start = getStart();
      const now = Date.now();
      const totalTime = getClockLength();

      const timeRemaining = totalTime - (now - start);

      if (timeRemaining <= 0) {
        setTimerIsRunning(false);
        document.body.style.backgroundColor = '#000';
      } else {
        const percRemaining = (timeRemaining / totalTime) * 100;

        clock!.textContent = msToTime(timeRemaining);
        // Color approaches red from black as time decreases
        const colorString = `hsl(7, ${Math.round(
          100 - percRemaining
        )}%, ${Math.round((100 - percRemaining) / 2)}%)`;
        clock!.style.color = colorString;
        clockWrapper!.style.borderColor = `rgba(0, 0, 0, ${
          percRemaining / 100
        })`;
      }
    }
  }, 500);
}
