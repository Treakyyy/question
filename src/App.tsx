import React, { useRef } from 'react';
import Header from './components/Header/Header';
import Questions from './components/Questions/Questions';
import './App.css';

interface TimerRef {
  resetTimer: () => void;
  stopTimer: () => void;
}

const App: React.FC = () => {
  const timerRef = useRef<TimerRef>(null);

  const handleResetTimer = () => {
    if (timerRef.current) {
      timerRef.current.resetTimer();
    }
  }

  const handleStopTimer = () => {
    if (timerRef.current) {
      timerRef.current.stopTimer();
    }
  }

  return (
    <div className="App">
      <Header timerRef={timerRef} />
      <Questions onStopTimer={handleStopTimer} onStartTimer={handleResetTimer} />
    </div>
  );
}

export default App;
