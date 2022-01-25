import { useState, useEffect } from 'react';

const useTimer = isActive => {
  const [seconds, setTime] = useState(0);
  const date = new Date(0);

  useEffect(() => {
    let interval;

    if (!isActive) {
      if (interval) clearInterval(interval);

      return;
    }

    interval = setInterval(() => {
      setTime(seconds => seconds + 1);
    }, 1000);

    return;
  }, [isActive]);

  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
};

export default useTimer;
