import { MouseEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { IQuiz, IQuizStatus } from 'types/quiz';

import cx from 'classnames';
import cs from './multiquiz.module.scss';
import qs from '../../Quiz/quiz.module.scss';
import { MULTI_CHILD_QUIZZES, MULTI_QUIZZES } from 'dummy/quizzes';
import { useMount } from 'react-use';

export const ExampleMultiQuiz = () => {
  const [quizzes, setQuizzes] = useState<IQuiz[]>(MULTI_QUIZZES);
  const [quiz, setQuiz] = useState({} as IQuiz);
  const [childQuizzes, setChildQuizzes] = useState<IQuiz[]>(MULTI_CHILD_QUIZZES);
  const [quizStatus, setQuizStatus] = useState({
    status: false,
    left: quizzes.length,
    total: quizzes.length,
  } as IQuizStatus);
  const [isFetching, setIsFetching] = useState(false);

  const [showCorrect, setShowCorrect] = useState(false);
  const onShowCorrect: MouseEventHandler<HTMLButtonElement> = () => {
    setSelectedAnswerIds([]);
    setShowCorrect((prev) => !prev);
  };

  const pickRandomQuiz = (): IQuiz => {
    const ranIdx = Math.floor(Math.random() * quizzes.length);
    const newQuiz = quizzes[ranIdx];
    setQuizzes((prev) => prev.filter((el, index) => index !== ranIdx));
    setQuizStatus((prev) => ({
      ...prev,
      left: prev.left - 1,
    }));
    return newQuiz;
  };

  useMount(() => {
    setQuiz(pickRandomQuiz());
  });

  const [selectedAnswerIds, setSelectedAnswerIds] = useState<number[]>([]);
  const onClickAnswer: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (showCorrect) {
      return;
    }
    const { id } = e.currentTarget.dataset;
    if (selectedAnswerIds.includes(Number(id))) {
      setSelectedAnswerIds((prev) => prev.filter((answerId) => answerId !== Number(id)));
    } else {
      setSelectedAnswerIds((prev) => [...prev, Number(id)]);
    }
  };

  const nav = useNavigate();
  const onNextQuiz: MouseEventHandler<HTMLButtonElement> = () => {
    setIsFetching(true);
    if (quizStatus.left === 0) {
      alert('퀴즈가 종료되었습니다.');
      nav(-1);
      return;
    }

    setShowCorrect(false);
    setQuiz(pickRandomQuiz());
    setIsFetching(false);
  };

  const onShowChild: MouseEventHandler<HTMLButtonElement> = () => {
    setShowCorrect(false);
    setQuiz(childQuizzes.filter((childQuiz) => childQuiz.quizId === quiz.childId)[0]);
  };

  return (
    <div className={qs.quizContainer}>
      <div className={qs.progressWrapper}>
        <progress
          className={cx(qs.progress, qs.progressB)}
          value={quizStatus.total - quizStatus.left}
          max={quizStatus.total}
        />
        <span>
          {quizStatus.total - quizStatus.left} / {quizStatus.total}
        </span>
      </div>
      <main className={qs.content}>
        <span className={qs.question}>{quiz?.question}</span>
      </main>
      {!isFetching && (
        <div className={cs.answerWrapper}>
          {quiz?.answerResponses?.map((answer) => (
            <button
              type='button'
              className={cx(
                cs.answer,
                selectedAnswerIds.includes(Number(answer.answerId)) && cs.selectAnswer,
                showCorrect && answer.isCorrect && cs.showCorrect,
                showCorrect && !answer.isCorrect && cs.showInCorrect
              )}
              data-id={answer.answerId}
              key={answer.answerId}
              onClick={onClickAnswer}
            >
              {answer.answer}
            </button>
          ))}
        </div>
      )}
      <div className={qs.buttonsWrapper}>
        {!isFetching && !showCorrect && (
          <button className={qs.showAnswer} type='button' onClick={onShowCorrect}>
            정답보기
          </button>
        )}
        {!isFetching && showCorrect && quiz.childId && (
          <button className={qs.childQuiz} type='button' onClick={onShowChild}>
            꼬리 질문
          </button>
        )}
        {!isFetching && showCorrect && (
          <button className={qs.nextQuiz} type='button' onClick={onNextQuiz}>
            다음문제
          </button>
        )}
      </div>
    </div>
  );
};
