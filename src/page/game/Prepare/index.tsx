import {
  PrepareQuizGameContainer,
  PrepareQuizGameQuizCount,
  PrepareQuizGameStartButton,
  PrepareQuizGameTagsContainer,
  PrepareQuizGameTitle,
  PrepareQuizGameTopContainer,
} from './index.stypes';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress, Skeleton } from '@mui/material';
import { IQuizPackDetail } from '../../../types/quizpacks';
import { QuizGameRadioType } from '../components/QuizGameTypeRadio/QuizGameRadioType';
import { startGameQuiz } from '../../../api/quizgame';
import { useErrorRequest } from '../../../hooks/useErrorRequest';
import { getQuizPackDetails } from '../../../api/quizpacks';

export const PrepareQuizGame = () => {
  const [quizPackState, setQuizPackState] = useState<IQuizPackDetail>();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const [radioState, setRadioState] = useState<'SEQUENCE_PICK' | 'RANDOM_PICK'>('SEQUENCE_PICK');
  const { setErrorState } = useErrorRequest();

  const navigate = useNavigate();
  const { quizPackId } = useParams();

  useEffect(() => {
    setLoadingState(true);
    getQuizPackDetails(Number(quizPackId), setErrorState, () => {
      navigate(-1);
    }).then((result) => {
      setQuizPackState(result);
      setLoadingState(false);
    });
  }, []);

  const onClickStartGame = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    startGameQuiz(Number(quizPackState?.quizPackId), radioState, setErrorState, () => {}).then((quizGameId: string) => {
      navigate(`/game/play/${quizGameId}`);
    });
  };

  if (loadingState) {
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
        <PrepareQuizGameTitle>{quizPackState?.quizPackTitle}</PrepareQuizGameTitle>
        <PrepareQuizGameTagsContainer>
          {quizPackState?.tags.map((tag) => <span key={tag.id}>#{tag.name}</span>)}
        </PrepareQuizGameTagsContainer>
        <PrepareQuizGameQuizCount>총 {quizPackState?.quizzes.length} 문제</PrepareQuizGameQuizCount>
      </PrepareQuizGameTopContainer>
      <QuizGameRadioType radioState={radioState} setRadioState={setRadioState} />
      <PrepareQuizGameStartButton type='button' onClick={onClickStartGame}>
        게임 시작!
      </PrepareQuizGameStartButton>
    </PrepareQuizGameContainer>
  );
};
