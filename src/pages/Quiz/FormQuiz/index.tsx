import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { MouseEventHandler, useMemo, useState } from 'react';

import { IQuiz, IQuizStatus } from 'types/quiz';
import ToastViewer from 'components/ToastUI/Viewer';
import { useFetchError } from 'hooks/useFetchError';
import { useChildQuizFetch } from 'hooks/useChildQuizFetch';
import { getQuizStatus, getRandomQuiz } from 'service/quizzes';

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

  const [showCorrect, setShowCorrect] = useState(false);
  const onShowCorrect = () => setShowCorrect((prev) => !prev);

  const onFetchError = useFetchError();
  const [quiz, setQuiz] = useState({} as IQuiz);
  const { isFetching, refetch: refetchQuiz } = useQuery(
    [`#random_quiz_${spaceId}`],
    () => getRandomQuiz(Number(spaceId), 'form'),
    {
      select: setQuiz,
      onSuccess: fetchQuizStatus,
      onError: onFetchError,
    }
  );

  const nav = useNavigate();
  const onNextQuiz: MouseEventHandler<HTMLButtonElement> = () => {
    if (quizStatus.left === 0) {
      alert('퀴즈가 종료되었습니다.');
      nav(`/space/${spaceId}`);
    } else {
      refetchQuiz().then(() => setShowCorrect(false));
    }
  };

  const { isChildQuizFetch, onFetchChildQuiz } = useChildQuizFetch({ setShowCorrect, setQuiz, quiz });
  const isCustomFetching = useMemo(() => !isFetching && isChildQuizFetch, [isFetching, isChildQuizFetch]);

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
      {!isCustomFetching && (
        <main className={qs.content}>
          {!showCorrect && <span className={qs.question}>{quiz?.question}</span>}
          {showCorrect && (
            <div className={cs.toastViewerWrapper}>
              <ToastViewer content={quiz?.answerResponses[0].answer ?? ''} />
            </div>
          )}
        </main>
      )}
      <div className={qs.buttonsWrapper}>
        {!isCustomFetching && !showCorrect && (
          <button className={qs.showAnswer} type='button' onClick={onShowCorrect}>
            정답보기
          </button>
        )}
        {!isCustomFetching && showCorrect && quiz.childId && (
          <button className={qs.childQuiz} type='button' onClick={onFetchChildQuiz}>
            꼬리 질문
          </button>
        )}
        {!isCustomFetching && showCorrect && (
          <button className={qs.nextQuiz} type='button' onClick={onNextQuiz}>
            다음문제
          </button>
        )}
      </div>
    </div>
  );
};
