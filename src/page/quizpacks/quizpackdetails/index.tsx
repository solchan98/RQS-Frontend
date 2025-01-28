import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IQuiz, IQuizPackDetail, IQuizPackMember } from '../../../types/quizpacks';
import { getQuizPackDetails } from '../../../api/quizpacks';
import { useErrorRequest } from '../../../hooks/useErrorRequest';
import { QuizPackDetailsContainer, QuizPackDetailsQuizzesContainer } from './index.styles';
import { QuizAccordion } from './components/QuizAccordion/QuizAccordion';
import { Tag } from '../../../components/Tag/Tag';
import { ITag } from '../../../types/common/tag';
import { Button } from '@mui/material';

const initQuizPackState = {
  quizzes: [] as IQuiz[],
  quizPackMembers: [] as IQuizPackMember[],
  tags: [] as ITag[],
} as IQuizPackDetail;

export const QuizPackDetails = () => {
  const { quizPackId } = useParams();
  const { setErrorState } = useErrorRequest();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const navigation = useNavigate();

  const [quizPackDetails, setQuizPackDetails] = useState<IQuizPackDetail>(initQuizPackState);

  const loadQuizPackDetails = () => {
    setLoadingState(true);
    getQuizPackDetails(Number(quizPackId), setErrorState, () => navigation(-1)).then((result) => {
      const empty = Object.keys(result).length === 0;
      setQuizPackDetails(!empty ? result : initQuizPackState);
      setLoadingState(false);
    });
  };

  useEffect(() => {
    loadQuizPackDetails();
  }, []);

  return (
    <QuizPackDetailsContainer>
      <div>{quizPackDetails?.quizPackTitle}</div>
      <span>{`Quizzes : ${quizPackDetails.quizzes.length}`}</span>
      <span>{`Members : ${quizPackDetails.quizPackMembers.length}`}</span>
      {quizPackDetails?.tags.map((tag) => <Tag key={tag.id} name={tag.name} size={12} />)}
      <Button
        type='button'
        onClick={() => {
          navigation(`/game/${quizPackDetails.quizPackId}/prepare`, { state: quizPackDetails });
        }}
      >
        게임 시작
      </Button>
      <QuizPackDetailsQuizzesContainer>
        {quizPackDetails?.quizzes.map((quiz) => <QuizAccordion key={quiz.quizId} quiz={quiz} />)}
      </QuizPackDetailsQuizzesContainer>
    </QuizPackDetailsContainer>
  );
};
