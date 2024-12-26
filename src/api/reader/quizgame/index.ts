import { IGameQuiz } from '../../../page/game/Play/index.types';
import { authPostRequest } from '../../index';
import { AxiosError } from 'axios';
import { CommonResponse } from '../../../types/common/response';
import { commonExceptionHandler } from '../../exceptionHandler';
import { IRequestError } from '../../../recoil/error';

export const startGameQuiz = async (
  quizPackId: number,
  quizPickStrategy: 'SEQUENCE_PICK' | 'RANDOM_PICK',
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
): Promise<string> => {
  return authPostRequest<CommonResponse<{ quizGameId: string }>>('/games', {
    quizPackId,
    quizPickStrategy,
  })
    .then((response) => {
      return response?.data.data.quizGameId ?? '';
    })
    .catch((error: AxiosError) => {
      commonExceptionHandler(error, `POST_GAMES_${quizPackId}`, setErrorState, errorCallback);
      return '';
    });
};

export const getNextGameQuiz = async (
  quizGameId: string,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
): Promise<IGameQuiz> => {
  return authPostRequest<CommonResponse<IGameQuiz>>(`/games/${quizGameId}/next-quiz`, {})
    .then((response) => {
      return response?.data.data ?? ({} as IGameQuiz);
    })
    .catch((error: AxiosError) => {
      commonExceptionHandler(error, `games/${quizGameId}`, setErrorState, errorCallback);
      return {} as IGameQuiz;
    });
};

export const submitGameQuiz = async (
  quizGameId: string,
  optionIds: number[],
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
): Promise<void> => {
  return authPostRequest(`/games/${quizGameId}/submission`, {
    optionIds,
  })
    .then(() => {})
    .catch((error: AxiosError) => {
      commonExceptionHandler(error, `games/${quizGameId}/submission`, setErrorState, errorCallback);
    });
};
