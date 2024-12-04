import { IPrepareQuizPack } from './index.types';
import {
  PrepareQuizGameContainer,
  PrepareQuizGameQuizCount,
  PrepareQuizGameStartButton,
  PrepareQuizGameTagsContainer,
  PrepareQuizGameTitle,
  PrepareQuizGameTopContainer,
} from './index.stypes';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress, Skeleton } from '@mui/material';

const dummy: IPrepareQuizPack = {
  quizPackId: 1,
  title: 'JPA 이해도 확인하기',
  quizCount: 4,
  tags: ['JPA', 'Hibernate', 'Spring Data JPA', 'ORM'],
};

export const PrepareQuizGame = () => {
  const [prepareQuizPackState, setPrepareQuizPackState] = useState<IPrepareQuizPack>();

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setPrepareQuizPackState(dummy);
    }, 2000);
  }, []);

  const onClickStartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // TODO: call game start api -> get quiz-game-id
    navigate(`../play/${1234}`);
  };

  if (!prepareQuizPackState) {
    return (
      <PrepareQuizGameContainer>
        <PrepareQuizGameTopContainer>
          <PrepareQuizGameTitle>
            <Skeleton variant='rounded' width='80vw' height='48px' animation='wave' />
          </PrepareQuizGameTitle>
          <PrepareQuizGameTagsContainer>
            <Skeleton variant='rounded' width='48px' height='24px' animation='wave' />
            <Skeleton variant='rounded' width='48px' height='24px' animation='wave' />
            <Skeleton variant='rounded' width='48px' height='24px' animation='wave' />
            <Skeleton variant='rounded' width='48px' height='24px' animation='wave' />
            <Skeleton variant='rounded' width='48px' height='24px' animation='wave' />
          </PrepareQuizGameTagsContainer>
          <PrepareQuizGameQuizCount>
            <Skeleton variant='rounded' width='80px' height='48px' animation='wave' />
          </PrepareQuizGameQuizCount>
        </PrepareQuizGameTopContainer>
        <span>퀴즈팩 정보를 불러오고 있어요!</span>
        <CircularProgress size='48px' style={{ marginTop: '12px' }} />
      </PrepareQuizGameContainer>
    );
  }

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
