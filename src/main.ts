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
  const startStop = getStartStopButton();
  if (getTimerRef().isRunning) {
    setTimerIsRunning(false);
    startStop.textContent = '▶';
  } else {
    setTimerIsRunning(true);
    // Not super accurate but whatever
    const timeRemaining = timeToMs(getClock().textContent!);
    setStart(Date.now() - (getClockLength() - timeRemaining));
    startStop.textContent = 'II';
  }
};

// SETUP INITIAL STATE
getClock().textContent = msToTime(getClockLength());
const startStop = getStartStopButton();
startStop.textContent = getTimerRef().isRunning ? 'II' : '▶';
startStop.addEventListener('click', onTogglePlay);

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
      const startStop = getStartStopButton();
      startStop.style.boxShadow = 'none';
      startStop.style.cursor = 'default';
      startStop.removeEventListener('click', onTogglePlay);
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
    }
  }
}, 333);
