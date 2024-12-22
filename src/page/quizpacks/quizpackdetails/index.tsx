import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IQuiz, IQuizPackDetail } from '../../../types/quizpacks';
import { getQuizPackDetails } from '../../../api/reader/quizpacks';
import { useErrorRequest } from '../../../hooks/useErrorRequest';
import { QuizPackDetailsContainer, QuizPackDetailsQuizzesContainer } from './index.styles';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { QuizAccordion } from './components/QuizAccordion/QuizAccordion';
import { Tag } from '../../../components/Tag/Tag';

export const QuizPackDetails = () => {
  const { quizPackId } = useParams();
  const { errorsState, setErrorState } = useErrorRequest();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const [quizPackDetails, setQuizPackDetails] = useState<IQuizPackDetail>();

  useEffect(() => {
    loadQuizPackDetails();
  }, []);

  const loadQuizPackDetails = () => {
    setLoadingState(true);
    getQuizPackDetails(Number(quizPackId), setErrorState).then((result) => {
      setQuizPackDetails(result.data);
      setLoadingState(false);
    });
  };

  return (
    <QuizPackDetailsContainer>
      <div>{quizPackDetails?.quizPackTitle}</div>
      <span>{`Quizzes : ${quizPackDetails?.quizzes.length}`}</span>
      <span>{`Members : ${quizPackDetails?.quizPackMembers.length}`}</span>
      {quizPackDetails?.tags.map((tag) => <Tag key={tag.id} name={tag.name} size={12} />)}
      <QuizPackDetailsQuizzesContainer>
        {quizPackDetails?.quizzes.map((quiz) => <QuizAccordion key={quiz.quizId} quiz={quiz} />)}
      </QuizPackDetailsQuizzesContainer>
    </QuizPackDetailsContainer>
  );
};
