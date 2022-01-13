import {
  getClock,
  getClockWrapper,
  getStartStopButton,
} from '~/src/logic/elements';
import {
  getStart,
  getClockLength,
  getTimerRef,
  setTimerIsRunning,
  setStart,
} from './logic/state';
import { msToTime, timeToMs } from './logic/util';

const onTogglePlay = () => {
  if (getTimerRef().isRunning) {
    setTimerIsRunning(false);
  } else {
    setTimerIsRunning(true);
    // Not super accurate but whatever
    const timeRemaining = timeToMs(getClock().textContent!);
    setStart(Date.now() - (getClockLength() - timeRemaining));
  }
};

// SETUP INITIAL STATE
getClock().textContent = msToTime(getClockLength());
getStartStopButton().textContent = getTimerRef().isRunning ? '||' : '▶';
getStartStopButton().addEventListener('click', onTogglePlay);

// SETUP CLOCK INTERVAL
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

      getClock().textContent = msToTime(timeRemaining);
      // Color approaches red from black as time decreases
      const colorString = `hsl(7, ${Math.round(
        100 - percRemaining
      )}%, ${Math.round((100 - percRemaining) / 2)}%)`;
      getClock().style.color = colorString;
      getClockWrapper().style.borderColor = `rgba(0, 0, 0, ${
        percRemaining / 100
      })`;
      getStartStopButton().textContent = getTimerRef().isRunning ? '||' : '▶';
    }
  }
}, 333);
