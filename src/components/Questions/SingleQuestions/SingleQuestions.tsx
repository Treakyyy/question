import React from 'react';
import styles from './SingleQuestions.module.css'

interface SingleQuestionsProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

const SingleQuestions: React.FC<SingleQuestionsProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div>
      {question.options.map((option, idx) => (
        <div className={styles.container__radio} key={idx}>
          <input
            type="radio"
            checked={selectedAnswer === option}
            onChange={() => onSelectAnswer(option)}
            className={styles.radio}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default SingleQuestions;
