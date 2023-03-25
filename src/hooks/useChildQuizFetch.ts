import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';

import { IQuiz } from 'types/quiz';
import { getQuiz } from 'service/quizzes';
import { useFetchError } from './useFetchError';

interface IProps {
  setShowCorrect: Dispatch<SetStateAction<boolean>>;
  setQuiz: Dispatch<SetStateAction<IQuiz>>;
  quiz: IQuiz;
}

export const useChildQuizFetch = ({ setShowCorrect, setQuiz, quiz }: IProps) => {
  const [isChildQuizFetch, setIsChildQuizFetch] = useState(false);
  const onFetchError = useFetchError();

  const onFetchChildQuiz: MouseEventHandler<HTMLButtonElement> = () => {
    setIsChildQuizFetch(true);
    setShowCorrect(false);
    getQuiz(Number(quiz.childId))
      .then((data) => {
        setQuiz(data);
        setIsChildQuizFetch(false);
      })
      .catch(onFetchError);
  };

  return { isChildQuizFetch, onFetchChildQuiz };
};
