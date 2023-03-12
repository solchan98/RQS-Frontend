import { useQuery } from '@tanstack/react-query';
import { getQuizStatus, getRandomSpaceItem } from 'service/items';
import { MouseEventHandler, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { IQuizStatus } from 'types/quiz';

import cx from 'classnames';
import cs from './formquiz.module.scss';
import ToastViewer from '../ToastUI/Viewer';
import { IItem } from 'types/item';
import { useLogout } from '../../hooks/useLogout';
import { AxiosError } from 'axios';

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
  } = useQuery([`#random_quiz_${spaceId}`], () => getRandomSpaceItem(Number(spaceId)), {
    select: (data): IItem => data,
    onSuccess: fetchQuizStatus,
    onError: (err: AxiosError<{ message: string }>) => onErrorGetSpace(err),
  });

  const nav = useNavigate();
  const onNextQuiz: MouseEventHandler<HTMLButtonElement> = () => {
    if (quizStatus.left === 0) {
      alert('퀴즈가 종료되었습니다.');
      nav(`/space/${spaceId}`);
    } else {
      refetchQuiz().then(() => setType(true));
    }
  };

  return (
    <div className={cs.container}>
      <div className={cs.progressWrapper}>
        <progress
          className={cx(cs.progress, cs.progressB)}
          value={quizStatus.total - quizStatus.left}
          max={quizStatus.total}
        />
        <span>
          {quizStatus.total - quizStatus.left} / {quizStatus.total}
        </span>
      </div>
      {!isFetching && (
        <main className={cs.content}>
          {type && <span className={cs.question}>{quiz?.question}</span>}
          {!type && (
            <div className={cs.toastViewerWrapper}>
              <ToastViewer content={quiz?.answer ?? ''} />
            </div>
          )}
        </main>
      )}
      {!isFetching && (
        <div className={cs.buttonsWrapper}>
          <button className={cs.show} type='button' onClick={changeType}>
            {type ? '정답보기' : '문제보기'}
          </button>
          <button className={cs.next} type='button' onClick={onNextQuiz}>
            다음문제
          </button>
        </div>
      )}
    </div>
  );
};
