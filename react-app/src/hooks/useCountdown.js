import { useEffect, useState, useReducer } from 'react';

const getReturnValues = (countDown) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return {days, hours, minutes, seconds};
};

const useCountdown = (target) => {
  const [countDown, setCountDown] = useState(target);
  const [countDownEnd, setCountDownEnd] = useState(false);

  const [timerReset, resetTimer] = useReducer(p => !p, false);
  const [startTimer, setStartTimer] = useReducer(p => !p, true);

  useEffect(() => {
    if (startTimer) {
      const timeout = setTimeout(() => {
        setCountDown(countDown - 1);
        setCountDownEnd(false)
      }, 1000);

      if (countDown === 0) {
        clearTimeout(timeout)
        setCountDownEnd(true)
        return false
      }

      return () => {
        clearTimeout(timeout);
        setCountDownEnd(true)
      }
    }
  }, [countDown, startTimer]);

  useEffect(() => {
    setCountDown(target);
    //eslint-disable-next-line
  }, [timerReset]);

  const time = getReturnValues(countDown * 1000)

  return [time, countDownEnd, resetTimer, startTimer, setStartTimer];
};

export { useCountdown };
