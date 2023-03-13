import timeAgo from 'util/timaAgo';
import { Link } from 'react-router-dom';

import cs from './item.module.scss';
import { Setting } from 'assets/svgs';
import { Box, Collapse, useDisclosure } from '@chakra-ui/react';
import ToastViewer from 'components/ToastUI/Viewer';
import { IQuiz } from 'types/quiz';

const TEMP_AVATAR = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';

interface Props {
  quiz: IQuiz;
  isUpdatable: boolean;
}

export const Item = ({ quiz, isUpdatable }: Props) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <button type='button' onClick={onToggle} className={cs.container}>
      <div className={cs.top}>
        <Link className={cs.avatar} to='#'>
          <img src={quiz.spaceMemberResponse?.avatar ?? TEMP_AVATAR} alt='profile_img' />
        </Link>
        <div className={cs.topSide}>
          <span className={cs.nickname}>{quiz.spaceMemberResponse.nickname}</span>
          <span className={cs.timestamp}>{timeAgo.format(new Date(quiz.createdAt))}</span>
          {isUpdatable && (
            <Link className={cs.setting} to={`/quiz/setting/${quiz.quizId}`}>
              <Setting />
            </Link>
          )}
        </div>
      </div>
      <div className={cs.main}>{quiz.question}</div>
      <div className={cs.bottom}>
        <ul className={cs.hintList}>
          {quiz.hint.length !== 0 &&
            quiz.hint.split(',').map((hint) => (
              <li key={hint} className={cs.hint}>
                {hint}
              </li>
            ))}
        </ul>
      </div>
      <Collapse className={cs.answer} in={isOpen} animateOpacity>
        <Box className={cs.viewerBox}>
          <ToastViewer content={quiz.answer} />
        </Box>
      </Collapse>
    </button>
  );
};
