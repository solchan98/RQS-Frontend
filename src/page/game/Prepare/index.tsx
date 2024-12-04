import { IPrepareQuizPack } from './index.types';
import {
  PrepareQuizGameContainer,
  PrepareQuizGameQuizCount,
  PrepareQuizGameStartButton,
  PrepareQuizGameTagsContainer,
  PrepareQuizGameTitle,
  PrepareQuizGameTopContainer,
} from './index.stypes';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const dummy: IPrepareQuizPack = {
  quizPackId: 1,
  title: 'JPA 이해도 확인하기JPA 이해도 확인하기JPA',
  quizCount: 4,
  tags: ['JPA', 'Hibernate', 'Spring Data JPA', 'ORM'],
};

export const PrepareQuizGame = () => {
  const navigate = useNavigate();

  const onClickStartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // TODO: call game start api -> get quiz-game-id
    navigate(`../play/${1234}`);
  };

  return (
    <PrepareQuizGameContainer>
      <PrepareQuizGameTopContainer>
        <PrepareQuizGameTitle>{dummy.title}</PrepareQuizGameTitle>
        <PrepareQuizGameTagsContainer>
          {dummy.tags.map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </PrepareQuizGameTagsContainer>
        <PrepareQuizGameQuizCount>총 {dummy.quizCount} 문제</PrepareQuizGameQuizCount>
      </PrepareQuizGameTopContainer>
      <PrepareQuizGameStartButton type='button' onClick={onClickStartGame}>
        게임 시작!
      </PrepareQuizGameStartButton>
    </PrepareQuizGameContainer>
  );
};
