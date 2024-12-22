import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IQuizPackDetail } from '../../../types/quizpacks';
import { getQuizPackDetails } from '../../../api/reader/quizpacks';
import { useErrorRequest } from '../../../hooks/useErrorRequest';

export const QuizPackDetails = () => {
  const { quizPackId } = useParams();
  const { errorsState, setErrorState } = useErrorRequest();
  const [loadingState, setLoadingState] = useState<boolean>(true);

  const [quizPackDetails, setQuizPackDetails] = useState<IQuizPackDetail[]>([]);

  const loadQuizPackDetails = () => {
    setLoadingState(true);
    getQuizPackDetails(Number(quizPackId), setErrorState).then((result) => {
      setQuizPackDetails(result.data);
      setLoadingState(false);
    });
  };

  useEffect(() => {
    loadQuizPackDetails();
  }, []);

  return <div>{`QuizPackDetails ${quizPackId}`}</div>;
};
