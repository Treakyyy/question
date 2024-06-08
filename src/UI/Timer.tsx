import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardedRef,
} from 'react';
import styles from './Timer.module.css';

interface TimerProps {}

export interface TimerHandle {
  resetTimer: () => void;
  stopTimer: () => void;
}

const Timer = forwardRef<TimerHandle, TimerProps>((props, ref: ForwardedRef<TimerHandle>) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const savedSeconds = localStorage.getItem('seconds');
    const savedMinutes = localStorage.getItem('minutes');

    if (savedSeconds !== null && savedMinutes !== null) {
      setSeconds(parseInt(savedSeconds, 10));
      setMinutes(parseInt(savedMinutes, 10));
    }

    const interval = setInterval(() => {
      if (isRunning) {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => prevMinutes + 1);
            return 0;
          }
          return prevSeconds + 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    localStorage.setItem('seconds', seconds.toString());
    localStorage.setItem('minutes', minutes.toString());
  }, [seconds, minutes]);

  useImperativeHandle(ref, () => ({
    resetTimer() {
      setSeconds(0);
      setMinutes(0);
      setIsRunning(true);
    },
    stopTimer() {
      setIsRunning(false);
    },
  }));

  return (
    <div className={styles.timer}>
      <h3>
        {minutes < 10 ? '0' + minutes : minutes}:
        {seconds < 10 ? '0' + seconds : seconds}
      </h3>
    </div>
  );
});

export default Timer;
