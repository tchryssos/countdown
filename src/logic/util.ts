export const minutesToMillis = (minutes: number) => minutes * 60000;

// Modified from https://stackoverflow.com/a/19700358
export const msToTime = (ms: number) => {
  // let centiseconds: string | number = Math.floor((ms % 1000) / 10);
  let seconds: string | number = Math.floor((ms / 1000) % 60);
  let minutes: string | number = Math.floor((ms / (1000 * 60)) % 60);
  let hours: string | number = Math.floor((ms / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  // centiseconds = centiseconds < 10 ? '0' + centiseconds : centiseconds;

  return hours + ':' + minutes + ':' + seconds;
};

export const timeToMs = (timeString: string) => {
  const [hrs, mins, secs] = timeString.split(':');

  return (
    parseInt(hrs, 10) * 60 * 60 * 1000 +
    parseInt(mins, 10) * 60 * 1000 +
    parseInt(secs, 10) * 1000
  );
};
