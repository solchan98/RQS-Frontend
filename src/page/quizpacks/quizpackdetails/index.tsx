import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IQuiz, IQuizPackDetail, IQuizPackMember } from '../../../types/quizpacks';
import { getQuizPackDetails } from '../../../api/reader/quizpacks';
import { useErrorRequest } from '../../../hooks/useErrorRequest';
import { QuizPackDetailsContainer, QuizPackDetailsQuizzesContainer } from './index.styles';
import { QuizAccordion } from './components/QuizAccordion/QuizAccordion';
import { Tag } from '../../../components/Tag/Tag';
import { ITag } from '../../../types/common/tag';

const initQuizPackState = {
  quizzes: [] as IQuiz[],
  quizPackMembers: [] as IQuizPackMember[],
  tags: [] as ITag[],
} as IQuizPackDetail;

export const QuizPackDetails = () => {
  const { quizPackId } = useParams();
  const { errorsState, setErrorState } = useErrorRequest();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const navigation = useNavigate();

  const [quizPackDetails, setQuizPackDetails] = useState<IQuizPackDetail>(initQuizPackState);

  useEffect(() => {
    const error = errorsState[`quiz-packs/${quizPackId}`];
    if (error !== undefined) {
      if (error.status === 403) {
        navigation('../');
      }
    }
  }, [errorsState]);

  useEffect(() => {
    loadQuizPackDetails();
  }, []);

  const loadQuizPackDetails = () => {
    setLoadingState(true);
    getQuizPackDetails(Number(quizPackId), setErrorState).then((result) => {
      const empty = Object.keys(result.data).length === 0;
      setQuizPackDetails(!empty ? result.data : initQuizPackState);
      setLoadingState(false);
    });
  };

  return (
    <QuizPackDetailsContainer>
      <div>{quizPackDetails?.quizPackTitle}</div>
      <span>{`Quizzes : ${quizPackDetails.quizzes.length}`}</span>
      <span>{`Members : ${quizPackDetails.quizPackMembers.length}`}</span>
      {quizPackDetails?.tags.map((tag) => <Tag key={tag.id} name={tag.name} size={12} />)}
      <QuizPackDetailsQuizzesContainer>
        {quizPackDetails?.quizzes.map((quiz) => <QuizAccordion key={quiz.quizId} quiz={quiz} />)}
      </QuizPackDetailsQuizzesContainer>
    </QuizPackDetailsContainer>
  );
};
