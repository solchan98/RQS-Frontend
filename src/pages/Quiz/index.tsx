import { useState } from 'react';
import { AxiosError } from 'axios';
import { ISpace } from 'types/space';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { QuizIntro } from 'components/QuizIntro';
import { getSpace } from 'service/spaces';
import { IQuizStatus } from 'types/quiz';
import { useLogout } from 'hooks/useLogout';
import { getQuizStatus } from 'service/quizzes';
import cs from './quiz.module.scss';

export const Quiz = () => {
  const [quizStatus, setQuizStatus] = useState({ status: false } as IQuizStatus);
  const { spaceId } = useParams();

  const nav = useNavigate();
  const logout = useLogout();
  const onErrorGetSpace = (err: AxiosError<{ message: string }>) => {
    if (err.response?.status === 401) {
      logout();
    } else {
      nav(-1);
      alert(err.response?.data.message);
    }
  };
  const { data: space } = useQuery([`#space_${spaceId}`], () => getSpace(Number(spaceId)), {
    select: (data): ISpace => data,
    onError: (err: AxiosError<{ message: string }>) => onErrorGetSpace(err),
  });

  useQuery([`#quiz_status_${spaceId}`], () => getQuizStatus(Number(spaceId)), {
    select: setQuizStatus,
  });

  return (
    <div className={cs.container}>
      <div className={cs.title}>{space?.title}</div>
      <div>
        <ul>
          <li>스페이스에 존재하는 모든 문제가 중복없이 랜덤으로 출제됩니다.</li>
          <li>창을 닫아도 이어서 퀴즈를 진행할 수 있습니다.</li>
        </ul>
      </div>
      <main>
        {!quizStatus.status && <QuizIntro />}
        {quizStatus.status && (
          <div className={cs.container}>
            <div>현재 퀴즈가 진행중입니다.</div>
            <div>전체 문제 : {quizStatus.total}</div>
            <div>남은 문제 : {quizStatus.left}</div>
            <Link className={cs.link} to='./form'>
              이어서 진행하기
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
