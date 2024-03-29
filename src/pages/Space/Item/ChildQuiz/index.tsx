import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MouseEventHandler, useState } from 'react';

import { getQuiz } from 'service/quizzes';
import { IQuiz } from 'types/quiz';

import cx from 'classnames';
import cs from './childquiz.module.scss';
import { Add, ArrowDown, ArrowUp, Setting } from 'assets/svgs';

interface Props {
  quizId: number;
  show: boolean;
  isUpdatable: boolean;
}

export const ChildQuiz = ({ quizId, show, isUpdatable }: Props) => {
  const [showChild, setShowChild] = useState(false);
  const onShowChild: MouseEventHandler<HTMLButtonElement> = () => setShowChild((prev) => !prev);

  const { data: quiz } = useQuery([`#child_quiz_${quizId}`], () => getQuiz(quizId), {
    select: (data: IQuiz) => data,
    enabled: show,
  });

  return (
    <div className={cx(cs.container, cs.defaultShow, show && cs.show)}>
      <main className={cs.contentWrapper}>
        <span className={cs.question}>{quiz?.question}</span>
        <div className={cs.side}>
          {quiz?.childId && (
            <button type='button' onClick={onShowChild}>
              {showChild ? <ArrowUp /> : <ArrowDown />}
            </button>
          )}
          {isUpdatable && !quiz?.childId && (
            <Link style={{ color: 'black' }} to={`./quiz/${quiz?.quizId}/new`}>
              <Add />
            </Link>
          )}
          {isUpdatable && (
            <Link className={cs.setting} to={`/quiz/setting/${quiz?.quizId}`}>
              <Setting />
            </Link>
          )}
        </div>
      </main>
      <div className={cx(cs.defaultShow, showChild && cs.show)}>
        {quiz?.childId && <ChildQuiz quizId={Number(quiz?.childId)} show={showChild} isUpdatable={isUpdatable} />}
      </div>
    </div>
  );
};
