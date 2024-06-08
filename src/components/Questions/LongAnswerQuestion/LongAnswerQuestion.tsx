import React from 'react';
import styles from './LongAnswerQuestion.module.css';

interface LongAnswerQuestionProps {
  question: string;
  selectedAnswer: string | undefined;
  onChangeAnswer: (value: string) => void;
}

const LongAnswerQuestion: React.FC<LongAnswerQuestionProps> = ({ question, selectedAnswer, onChangeAnswer }) => {
  return (
    <div>
      <textarea
        value={selectedAnswer || ''}
        onChange={(e) => onChangeAnswer(e.target.value)}
        placeholder="Ответ..."
        className={styles.textarea}
      />
    </div>
  );
};

export default LongAnswerQuestion;
