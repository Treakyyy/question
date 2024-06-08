import React from 'react';
import styles from './MultipleQuestion.module.css'

interface MultipleQuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  multiSelectAnswers: string[];
  onSelectAnswer: (answers: string[]) => void;
}

const MultipleQuestion: React.FC<MultipleQuestionProps> = ({
  question,
  multiSelectAnswers,
  onSelectAnswer,
}) => {
  const handleChange = (option: string) => {
    let newAnswers;
    if (multiSelectAnswers.includes(option)) {
      newAnswers = multiSelectAnswers.filter((answer) => answer !== option);
    } else {
      newAnswers = [...multiSelectAnswers, option];
    }
    onSelectAnswer(newAnswers);
  };

  return (
    <div>
      {question.options.map((option, idx) => (
        <div className={styles.container__input} key={idx}>
          <input
            type="checkbox"
            checked={multiSelectAnswers.includes(option)}
            onChange={() => handleChange(option)}
            className={styles.input}
          />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default MultipleQuestion;


