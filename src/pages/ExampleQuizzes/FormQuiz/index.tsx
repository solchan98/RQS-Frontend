import { useMount } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler, useState } from 'react';

import { IQuiz, IQuizStatus } from 'types/quiz';
import ToastViewer from 'components/ToastUI/Viewer';

import cx from 'classnames';
import cs from './formquiz.module.scss';
import qs from '../../Quiz/quiz.module.scss';
import { FORM_CHILD_QUIZ, FORM_QUIZZES } from 'dummy/quizzes';

export const ExampleFormQuiz = () => {
  const [quiz, setQuiz] = useState({} as IQuiz);
  const [quizzes, setQuizzes] = useState<IQuiz[]>(FORM_QUIZZES);
  const [childQuizzes, setChildQuizzes] = useState<IQuiz[]>(FORM_CHILD_QUIZ);
  const [quizStatus, setQuizStatus] = useState({
    status: false,
    left: quizzes.length,
    total: quizzes.length,
  } as IQuizStatus);
  const [isFetching, setIsFetching] = useState(false);

  const [showCorrect, setShowCorrect] = useState(false);
  const onShowCorrect = () => setShowCorrect((prev) => !prev);

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
      {!isFetching && (
        <main className={qs.content}>
          {!showCorrect && <span className={qs.question}>{quiz?.question}</span>}
          {showCorrect && (
            <div className={cs.toastViewerWrapper}>
              <ToastViewer content={quiz?.answerResponses[0]?.answer ?? ''} />
            </div>
          )}
        </main>
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
