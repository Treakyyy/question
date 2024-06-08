import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  total: number;
  current: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, current }) => {
  return (
    <div className="progress-bar">
      {Array.from({ length: total }).map((_, idx) => (
        <div
          key={idx}
          className={`progress-step ${idx <= current ? 'active' : ''}`}
        ></div>
      ))}
    </div>
  );
}

export default ProgressBar;

