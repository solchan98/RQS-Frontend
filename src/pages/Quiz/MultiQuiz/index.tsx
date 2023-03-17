import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { MouseEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLogout } from 'hooks/useLogout';
import { IQuiz, IQuizStatus } from 'types/quiz';
import { getQuizStatus, getRandomQuiz } from 'service/quizzes';

import cx from 'classnames';
import cs from './multiquiz.module.scss';
import qs from '../quiz.module.scss';

export const MultiQuiz = () => {
  const { spaceId } = useParams();
  const [quizStatus, setQuizStatus] = useState({ status: false, left: 0, total: 0 } as IQuizStatus);

  const [showCorrect, setShowCorrect] = useState(false);
  const onShowCorrect: MouseEventHandler<HTMLButtonElement> = () => {
    setSelectedAnswerIds([]);
    setShowCorrect((prev) => !prev);
  };

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

  const fetchQuizStatus = () => {
    setShowCorrect(false);
    setSelectedAnswerIds([]);
    getQuizStatus(Number(spaceId)).then((data) => {
      if (data.left !== 0) {
        setQuizStatus(data);
      } else {
        setQuizStatus((prev) => ({
          ...prev,
          left: prev.left - 1,
        }));
      }
    });
  };

  const logout = useLogout();
  const nav = useNavigate();
  const onErrorGetSpace = (err: AxiosError<{ message: string }>) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };

  const {
    data: quiz,
    isFetching,
    refetch: refetchQuiz,
  } = useQuery([`#random_quiz_${spaceId}`], () => getRandomQuiz(Number(spaceId), 'multi'), {
    select: (data): IQuiz => data,
    onSuccess: fetchQuizStatus,
    onError: (err: AxiosError<{ message: string }>) => onErrorGetSpace(err),
  });

  const onNextQuiz: MouseEventHandler<HTMLButtonElement> = () => {
    if (quizStatus.left === 0) {
      alert('퀴즈가 종료되었습니다.');
      nav(`/space/${spaceId}`);
      return;
    }
    refetchQuiz().then();
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
          {quiz?.answerResponses.map((answer) => (
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
      {!isFetching && (
        <div className={qs.buttonsWrapper}>
          {!showCorrect ? (
            <button className={qs.showAnswer} type='button' onClick={onShowCorrect}>
              정답보기
            </button>
          ) : (
            <button className={qs.nextQuiz} type='button' onClick={onNextQuiz}>
              다음문제
            </button>
          )}
        </div>
      )}
    </div>
  );
};
