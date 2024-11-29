import { useParams } from 'react-router-dom';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import React, { useState } from 'react';
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

export interface IAnswer {
  id: number;
  content: string;
}

interface IGameQuiz {
  quizId: number;
  content: string;
  answers: IAnswer[];
}

const dummy: IGameQuiz[] = [
  {
    quizId: 1,
    content: '다음 중 JPA의 주요 기능이 아닌 것은 무엇인가요? ',
    answers: [
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
    answers: [
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
  const { progressState, next, isEnd } = useProgressBarState({ current: 1, totalCount: dummy.length });
  const { submitOptions, onClickOption, clearSubmitOption } = useSubmitOption();

  const pick = () => {
    const quiz: IGameQuiz = dummy[progressState.current ?? 1];
    console.log(submitOptions);

    if (isEnd()) {
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
        {currentQuizState.answers.map((answer) => (
          <QuizOption key={answer.id} answer={answer} onClickOption={onClickOption} />
        ))}
      </QuizOptionsContainer>
      <NextQuizButtonContainer>
        {isEnd() ? (
          <button type='button' onClick={pick}>
            제출하고 퀴즈 종료
          </button>
        ) : (
          <button type='button' onClick={pick}>
            다음 퀴즈
          </button>
        )}
      </NextQuizButtonContainer>
    </QuizGameContainer>
  );
};
