import { useQuery } from '@tanstack/react-query';
import { getQuiz } from 'service/quizzes';
import { IQuiz } from 'types/quiz';

import cx from 'classnames';
import cs from './childquiz.module.scss';
import { MouseEventHandler, useState } from 'react';

interface Props {
  quizId: number;
  show: boolean;
  updatable: boolean;
}

export const ChildQuiz = ({ quizId, show, updatable }: Props) => {
  const [showChild, setShowChild] = useState(false);
  const onShowChild: MouseEventHandler<HTMLButtonElement> = () => setShowChild((prev) => !prev);

  const { data: quiz, isFetching } = useQuery([`#child_quiz_${quizId}`], () => getQuiz(quizId), {
    select: (data: IQuiz) => data,
    enabled: show,
  });

  return (
    <div className={cx(cs.container, cs.defaultShow, show && cs.show)}>
      <div>
        {quiz?.question}
        {quiz?.childId && (
          <button type='button' onClick={onShowChild}>
            꼬리 퀴즈
          </button>
        )}
      </div>
      <div className={cx(cs.defaultShow, showChild && cs.show)}>
        {quiz?.childId && <ChildQuiz quizId={Number(quiz?.childId)} show={showChild} updatable={updatable} />}
      </div>
    </div>
  );
};
