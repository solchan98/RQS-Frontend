import { useParams } from 'react-router-dom';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { useState } from 'react';

import {
  NextQuizButtonContainer,
  QuizGameContainer,
  QuizGameProgressBarContainer,
  QuizGameQuizContainer,
  QuizOptionsContainer,
  QuizTitleContainer,
} from './index.styles';
import { useProgressBarState } from '../../components/ProgressBar/useProgressBarState';
import { QuizOption } from '../../components/QuizOption/QuizOption';
import { useSubmitOption } from '../../components/QuizOption/useSubmitOption';
import { Button } from '@mui/material';
import { IGameQuiz } from './index.types';

const dummy: IGameQuiz[] = [
  {
    quizId: 1,
    content: '다음 중 JPA의 주요 기능이 아닌 것은 무엇인가요? ',
    options: [
      {
        id: 1,
        content: '엔티티의 영속성 관리',
      },
      {
        id: 2,
        content: '데이터베이스 연결 관리',
      },
      {
        id: 3,
        content: '쿼리 자동 생성',
      },
      {
        id: 4,
        content: '네트워크 프로토콜 관리',
      },
    ],
  },
  {
    quizId: 2,
    content: '@Entity 어노테이션을 사용할 때 필수적으로 필요한 조건은 무엇인가요?',
    options: [
      {
        id: 5,
        content: '반드시 @Id를 지정해야 한다.',
      },
      {
        id: 6,
        content: '@GeneratedValue를 반드시 사용해야 한다.',
      },
      {
        id: 7,
        content: '클래스 이름과 데이터베이스 테이블 이름이 반드시 같아야 한다.',
      },
      {
        id: 8,
        content: '모든 필드가 @Column으로 명시되어야 한다.',
      },
    ],
  },
];

export const QuizGame = () => {
  const { quizGameId } = useParams();

  const [currentQuizState, setCurrentQuizState] = useState<IGameQuiz>(dummy[0]);
  const { progressState, isLast, next } = useProgressBarState({ current: 1, totalCount: dummy.length });
  const { submitOptions, onClickOption, clearSubmitOption } = useSubmitOption();

  const pick = () => {
    const quiz: IGameQuiz = dummy[progressState.current ?? 1];
    console.log(submitOptions);

    if (submitOptions.size === 0) {
      alert('정답은 최소 1개 이상 선택하여야합니다.');
      return;
    }

    if (isLast()) {
      alert('모든 퀴즈를 진행하였습니다.');
      return;
    }
    next();
    setCurrentQuizState(quiz);
    clearSubmitOption();
  };

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
          <QuizOption key={option.id} option={option} onClickOption={onClickOption} />
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
