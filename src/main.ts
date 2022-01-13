import {
  getClock,
  getClockWrapper,
  getIncButtons,
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

// ON CLICKS
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

type TimeUnit = 'hr' | 'min' | 'sec';
const createOnIncOrDec = (unit: TimeUnit, operation: '+' | '-') => () => {
  const clock = getClock();
  const [hr, min, sec] = clock.textContent!.split(':');
  const timeObj: Record<TimeUnit, number> = {
    hr: parseInt(hr, 10),
    min: parseInt(min, 10),
    sec: parseInt(sec, 10),
  };

  const nextVal = operation === '+' ? timeObj[unit] + 1 : timeObj[unit] - 1;
  timeObj[unit] = nextVal > 59 ? 0 : nextVal < 0 ? 59 : nextVal;

  clock.textContent = Object.keys(timeObj)
    .map(
      (unit) =>
        `${timeObj[unit as TimeUnit] < 10 ? '0' : ''}${
          timeObj[unit as TimeUnit]
        }`
    )
    .join(':');
};

// SETUP INITIAL STATE
getClock().textContent = msToTime(getClockLength());
const startStop = getStartStopButton();
startStop.textContent = getTimerRef().isRunning ? 'II' : '▶';
startStop.addEventListener('click', onTogglePlay);
Array.from(getIncButtons()).forEach((b, i) =>
  b.addEventListener(
    'click',
    createOnIncOrDec(
      i < 2 ? 'hr' : i < 4 ? 'min' : 'sec',
      i % 2 === 0 ? '+' : '-'
    )
  )
);

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
