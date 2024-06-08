import React from 'react';
import styles from './ShortAnswerQuestion.module.css';

interface ShortAnswerQuestionProps {
  question: string;
  selectedAnswer: string | undefined;
  onChangeAnswer: (value: string) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({ question, selectedAnswer, onChangeAnswer }) => {
  return (
    <div>
      <input
        type="text"
        value={selectedAnswer || ''}
        onChange={(e) => onChangeAnswer(e.target.value)}
        placeholder="Ответ..."
        className={styles.input}
      />
    </div>
  );
};

export default ShortAnswerQuestion;
