import React from 'react';
import Button from '../UI/Button';

interface CongratulationProps {
  onReset: () => void;
}

const Congratulation: React.FC<CongratulationProps> = ({ onReset }) => {
  return (
    <div>
      <h2>Поздравляем! Вы прошли тест.</h2>
      <Button text="Пройти тест заново" onClick={onReset} />
    </div>
  );
}

export default Congratulation;

