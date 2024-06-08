import React, { useEffect, useState } from 'react';
import data from '../../data.json';
import Button from '../../UI/Button';
import Congratulation from '../../UI/Congratulation';
import ProgressBar from '../../UI/ProgressBar';
import SingleQuestions from './SingleQuestions/SingleQuestions';
import MultipleQuestion from './MultipleQuestion/MultipleQuestion';
import ShortAnswerQuestion from './ShortAnswerQuestion/ShortAnswerQuestion';
import LongAnswerQuestion from './LongAnswerQuestion/LongAnswerQuestion';
import styles from './Questions.module.css';

interface Question {
  id: number;
  question: string;
  type: 'single' | 'multiple' | 'short' | 'long';
  options?: string[];
}

interface QuestionsProps {
  onStopTimer: () => void;
  onStartTimer: () => void;
}

const Questions: React.FC<QuestionsProps> = ({ onStopTimer, onStartTimer }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [multiSelectAnswers, setMultiSelectAnswers] = useState<string[]>([]);

  useEffect(() => {
    const formattedData: Question[] = data.map((item: any) => ({
      id: item.id,
      question: item.question,
      type: item.type,
      options: [item.answer1, item.answer2, item.answer3].filter(Boolean),
    }));

    setQuestions(formattedData);
    const savedIndex = localStorage.getItem('currentIndex');
    if (savedIndex !== null) {
      setIndex(parseInt(savedIndex, 10));
    }
    onStartTimer();
  }, [onStartTimer]);

  useEffect(() => {
    if (questions.length > 0) {
      const savedAnswer = localStorage.getItem(`selectedAnswer${index}`);
      if (savedAnswer !== null) {
        if (questions[index].type === 'multiple') {
          setMultiSelectAnswers(JSON.parse(savedAnswer));
        } else {
          setSelectedAnswer(savedAnswer);
        }
      } else {
        setSelectedAnswer(null);
        setMultiSelectAnswers([]);
      }
    }
  }, [index, questions]);

  useEffect(() => {
    localStorage.setItem('currentIndex', index.toString());
  }, [index]);

  const handleAnswer = () => {
    if (questions[index].type === 'multiple' && multiSelectAnswers.length > 0) {
      localStorage.setItem(
        `selectedAnswer${index}`,
        JSON.stringify(multiSelectAnswers)
      );
      setIndex((prevIndex) => prevIndex + 1);
    } else if (selectedAnswer !== null) {
      localStorage.setItem(`selectedAnswer${index}`, selectedAnswer);
      setIndex((prevIndex) => prevIndex + 1);
    } else {
      alert('Пожалуйста, выберите ответ перед переходом к следующему вопросу.');
    }

    if (index === questions.length - 1) {
      onStopTimer();
    }
  };

  const handleReset = () => {
    localStorage.clear();
    setIndex(0);
    setSelectedAnswer(null);
    setMultiSelectAnswers([]);
    onStartTimer();
  };

  const renderQuestionComponent = (question: Question) => {
    const questionComponents: Record<string, React.ElementType> = {
      single: SingleQuestions,
      multiple: MultipleQuestion,
      short: ShortAnswerQuestion,
      long: LongAnswerQuestion,
      // тут можно докинуть новый тип вопроса
    };

    const QuestionComponent = questionComponents[question.type];

    if (!QuestionComponent) {
      return <div>Unknown question type: {question.type}</div>;
    }

    return (
      <QuestionComponent
        question={question}
        selectedAnswer={selectedAnswer}
        multiSelectAnswers={multiSelectAnswers}
        onSelectAnswer={
          question.type === 'multiple'
            ? setMultiSelectAnswers
            : setSelectedAnswer
        }
        onChangeAnswer={setSelectedAnswer}
      />
    );
  };

  return (
    <div className={styles.questionsContainer}>
      <ProgressBar total={questions.length} current={index} />
      {questions.length > 0 && index < questions.length ? (
        <>
          <h3 className={styles.question__text}>{questions[index].question}</h3>
          {renderQuestionComponent(questions[index])}
          <Button text={'Ответить'} onClick={handleAnswer} />
        </>
      ) : (
        <Congratulation onReset={handleReset} />
      )}
    </div>
  );
};

export default Questions;
