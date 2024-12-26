import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ProgressBar } from '../../../components/ProgressBar/ProgressBar';
import { useEffect, useState } from 'react';

import {
  NextQuizButtonContainer,
  QuizGameContainer,
  QuizGameProgressBarContainer,
  QuizGameQuizContainer,
  QuizOptionsContainer,
  QuizTitleContainer,
} from './index.styles';
import { useProgressBarState } from '../../../components/ProgressBar/useProgressBarState';
import { QuizOption } from '../../../components/QuizOption/QuizOption';
import { useSubmitOption } from '../../../components/QuizOption/useSubmitOption';
import { Button } from '@mui/material';
import { IGameQuiz } from './index.types';
import { authGetRequest, authPostRequest } from '../../../api';

export const PlayQuizGame = () => {
  const { quizGameId } = useParams();
  const { state: quizSize } = useLocation();
  const navigate = useNavigate();

  const [currentQuizState, setCurrentQuizState] = useState<IGameQuiz>({} as IGameQuiz);
  const { progressState, isLast, next } = useProgressBarState({ current: 1, totalCount: quizSize });
  const { submitOptions, onClickOption, clearSubmitOption } = useSubmitOption();

  const [isLoading, setIsLoading] = useState(true);

  const pick = () => {
    if (submitOptions.size === 0) {
      alert('정답은 최소 1개 이상 선택하여야합니다.');
      return;
    }

    if (isLast()) {
      authPostRequest(`/games/${quizGameId}/submission`, {
        optionIds: Array.from(submitOptions),
      });
      alert('모든 퀴즈를 진행하였습니다.');
      navigate(-1);
      return;
    }

    authPostRequest(`/games/${quizGameId}/submission`, {
      optionIds: Array.from(submitOptions),
    }).then(() => {
      setIsLoading(true);
      authPostRequest(`/games/${quizGameId}/next-quiz`, {})
        .then((response) => {
          const result = response?.data as { data: IGameQuiz };
          setCurrentQuizState(result.data);
        })
        .catch((error) => {
          alert(error.message);
        })
        .finally(() => setIsLoading(false));

      next();
      // setCurrentQuizState(quiz);
      clearSubmitOption();
    });
  };

  useEffect(() => {
    setIsLoading(true);
    authPostRequest(`/games/${quizGameId}/next-quiz`, {})
      .then((response) => {
        const result = response?.data as { data: IGameQuiz };
        setCurrentQuizState(result.data);
      })
      .catch((error) => {
        alert(error.message);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <QuizGameContainer>
      <QuizGameProgressBarContainer>
        <span>{`${progressState.current} / ${progressState.totalCount}`}</span>
        <ProgressBar progressState={progressState} />
      </QuizGameProgressBarContainer>
      <QuizGameQuizContainer>
        <QuizTitleContainer>{currentQuizState.content}</QuizTitleContainer>
      </QuizGameQuizContainer>
      <QuizOptionsContainer>
        {currentQuizState.options.map((option) => (
          <QuizOption key={option.optionId} option={option} onClickOption={onClickOption} />
        ))}
      </QuizOptionsContainer>
      <NextQuizButtonContainer>
        <Button type='button' onClick={pick}>
          {`${isLast() ? '제출하고 퀴즈 종료' : '다음 퀴즈'}`}
        </Button>
      </NextQuizButtonContainer>
    </QuizGameContainer>
  );
};
