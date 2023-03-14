import { AxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getQuizStatus, getRandomQuiz } from 'service/quizzes';
import { MouseEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useLogout } from 'hooks/useLogout';
import { IQuiz, IQuizStatus } from 'types/quiz';
import ToastViewer from 'components/ToastUI/Viewer';

import cx from 'classnames';
import cs from './formquiz.module.scss';
import qs from '../quiz.module.scss';

export const FormQuiz = () => {
  const { spaceId } = useParams();
  const [quizStatus, setQuizStatus] = useState({ status: false, left: 0, total: 0 } as IQuizStatus);

  const fetchQuizStatus = () => {
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

  const [type, setType] = useState(true);
  const changeType = () => setType((prev) => !prev);

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
  } = useQuery([`#random_quiz_${spaceId}`], () => getRandomQuiz(Number(spaceId), 'form'), {
    select: (data): IQuiz => data,
    onSuccess: fetchQuizStatus,
    onError: (err: AxiosError<{ message: string }>) => onErrorGetSpace(err),
  });

  const onNextQuiz: MouseEventHandler<HTMLButtonElement> = () => {
    if (quizStatus.left === 0) {
      alert('퀴즈가 종료되었습니다.');
      nav(`/space/${spaceId}`);
    } else {
      refetchQuiz().then(() => setType(true));
    }
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
      {!isFetching && (
        <main className={qs.content}>
          {type && <span className={qs.question}>{quiz?.question}</span>}
          {!type && (
            <div className={cs.toastViewerWrapper}>
              <ToastViewer content={quiz?.answerResponses[0].answer ?? ''} />
            </div>
          )}
        </main>
      )}
      {!isFetching && (
        <div className={qs.buttonsWrapper}>
          <button className={qs.show} type='button' onClick={changeType}>
            {type ? '정답보기' : '문제보기'}
          </button>
          <button className={qs.next} type='button' onClick={onNextQuiz}>
            다음문제
          </button>
        </div>
      )}
    </div>
  );
};
