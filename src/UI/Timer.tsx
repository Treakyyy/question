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
  startTimer: () => void;
}

const Timer = forwardRef<TimerHandle, TimerProps>((props, ref: ForwardedRef<TimerHandle>) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    const savedStartTime = localStorage.getItem('startTime');
    const savedElapsedTime = localStorage.getItem('elapsedTime');
    
    if (savedStartTime) {
      const startTime = parseInt(savedStartTime, 10);
      const currentTime = Date.now();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      const totalElapsedTime = (savedElapsedTime ? parseInt(savedElapsedTime, 10) : 0) + elapsed;
      setElapsedTime(totalElapsedTime);
    }

    const interval = setInterval(() => {
      if (isRunning) {
        setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      localStorage.setItem('startTime', Date.now().toString());
      localStorage.setItem('elapsedTime', elapsedTime.toString());
    }
  }, [elapsedTime, isRunning]);

  useImperativeHandle(ref, () => ({
    resetTimer() {
      setElapsedTime(0);
      setIsRunning(true);
      localStorage.removeItem('startTime');
      localStorage.removeItem('elapsedTime');
    },
    stopTimer() {
      setIsRunning(false);
    },
    startTimer() {
      setIsRunning(true);
      localStorage.setItem('startTime', Date.now().toString());
    },
  }));

  const minutes = Math.floor(elapsedTime / 60);
  const seconds = elapsedTime % 60;

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
