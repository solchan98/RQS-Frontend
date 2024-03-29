import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { ISpace } from 'types/space';
import { IQuizStatus } from 'types/quiz';
import { getSpace } from 'service/spaces';
import { getQuizStatus } from 'service/quizzes';
import { QuizIntro } from 'components/QuizIntro';
import { useFetchError } from 'hooks/useFetchError';

import cs from './quiz.module.scss';

export const Quiz = () => {
  const [quizStatus, setQuizStatus] = useState({ status: false } as IQuizStatus);
  const { spaceId } = useParams();

  const onFetchError = useFetchError();
  const { data: space } = useQuery([`#space_${spaceId}`], () => getSpace(Number(spaceId)), {
    select: (data): ISpace => data,
    onError: onFetchError,
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
            <Link className={cs.link} to={`./${quizStatus.type}`}>
              이어서 진행하기
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};
