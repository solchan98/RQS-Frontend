import { useNavigate, useParams } from 'react-router-dom';
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
import { getNextGameQuiz, submitGameQuiz } from '../../../api/quizgame';
import { useErrorRequest } from '../../../hooks/useErrorRequest';

export const PlayQuizGame = () => {
  const { quizGameId } = useParams();
  const navigate = useNavigate();

  const [currentQuizState, setCurrentQuizState] = useState<IGameQuiz>({} as IGameQuiz);
  const { progressState, updateProgressState, isLast } = useProgressBarState({ current: 0, totalCount: 0 });
  const { submitOptions, onClickOption, clearSubmitOption } = useSubmitOption();
  const { setErrorState } = useErrorRequest();

  const [isLoading, setIsLoading] = useState(true);

  const nextGameQuiz = () => {
    setIsLoading(true);
    getNextGameQuiz(String(quizGameId), setErrorState, () => {}).then((data) => {
      setCurrentQuizState(data);
      updateProgressState({ current: data.submittedQuizCount + 1, totalCount: data.totalQuizCount });
      clearSubmitOption();
      setIsLoading(false);
    });
  };

  useEffect(() => {
    nextGameQuiz();
  }, []);

  const pick = () => {
    if (submitOptions.size === 0) {
      alert('정답은 최소 1개 이상 선택하여야합니다.');
      return;
    }

    if (isLast()) {
      submitGameQuiz(String(quizGameId), Array.from(submitOptions), setErrorState, () => {}).then(() => {
        alert('모든 퀴즈를 진행하였습니다.');
        navigate(-1);
      });
      setIsLoading(true);
      clearSubmitOption();
      return;
    }

    setIsLoading(true);
    submitGameQuiz(String(quizGameId), Array.from(submitOptions), setErrorState, () => {}).then(() => {
      clearSubmitOption();
      nextGameQuiz();
    });
  };

  if (isLoading) {
    return (
      <QuizGameContainer>
        {progressState.totalCount === 0 ? (
          <span>loading...</span>
        ) : (
          <QuizGameProgressBarContainer>
            <span>{`${progressState.current} / ${progressState.totalCount}`}</span>
            <ProgressBar progressState={progressState} />
          </QuizGameProgressBarContainer>
        )}
      </QuizGameContainer>
    );
  }

  return (
    <QuizGameContainer>
      <QuizGameProgressBarContainer>
        <span>{`${progressState.current} / ${progressState.totalCount}`}</span>
        <ProgressBar progressState={progressState} />
      </QuizGameProgressBarContainer>
      <QuizGameQuizContainer>
        <QuizTitleContainer>{currentQuizState.quiz.content}</QuizTitleContainer>
      </QuizGameQuizContainer>
      <QuizOptionsContainer>
        {currentQuizState.quiz.options.map((option) => (
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
