import timeAgo from 'util/timaAgo';
import { Link } from 'react-router-dom';

import cs from './item.module.scss';
import { Add, ArrowDown, ArrowUp, Setting } from 'assets/svgs';
import { IQuiz } from 'types/quiz';
import { MouseEventHandler, useState } from 'react';
import { ChildQuiz } from './ChildQuiz';

const TEMP_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

interface Props {
  quiz: IQuiz;
  isUpdatable: boolean;
}

export const Item = ({ quiz, isUpdatable }: Props) => {
  const [showChild, setShowChild] = useState(false);
  const onShowChild: MouseEventHandler<HTMLButtonElement> = () => setShowChild((prev) => !prev);
  return (
    <div className={cs.container}>
      <div className={cs.top}>
        <Link className={cs.avatar} to='#'>
          <img src={quiz.spaceMemberResponse?.avatar ?? TEMP_AVATAR} alt='profile_img' />
        </Link>
        <div className={cs.topSide}>
          <span className={cs.nickname}>{quiz.spaceMemberResponse.nickname}</span>
          <span className={cs.timestamp}>{timeAgo.format(new Date(quiz.createdAt))}</span>
        </div>
        {isUpdatable && (
          <div className={cs.topRightSide}>
            {quiz.childId ? (
              <button type='button' onClick={onShowChild}>
                {showChild ? <ArrowUp /> : <ArrowDown />}
              </button>
            ) : (
              <Link style={{ color: 'black' }} to='#'>
                <Add />
              </Link>
            )}
            <Link className={cs.setting} to={`/quiz/setting/${quiz.quizId}`}>
              <Setting />
            </Link>
          </div>
        )}
      </div>
      <div className={cs.main}>{quiz.question}</div>
      <div className={cs.bottom}>
        <ChildQuiz quizId={quiz.childId} show={showChild} updatable={isUpdatable} />
      </div>
    </div>
  );
};
