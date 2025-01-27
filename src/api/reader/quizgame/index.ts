import { IGameQuiz } from '../../../page/game/Play/index.types';
import { authGetRequest, authPostRequest } from '../../index';
import { AxiosError } from 'axios';
import { CommonResponse } from '../../../types/common/response';
import { commonExceptionHandler } from '../../exceptionHandler';
import { IRequestError } from '../../../recoil/error';
import { Contributions, OnGoingGame } from '../../../types/home';

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

export const getOnGoingQuizGames = async (
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
): Promise<OnGoingGame[]> => {
  return authGetRequest<CommonResponse<OnGoingGame[]>>('/games/in-progress')
    .then((response) => {
      return response?.data.data ?? ([] as OnGoingGame[]);
    })
    .catch((error: AxiosError) => {
      commonExceptionHandler(error, `/games/in-progress`, setErrorState, errorCallback);
      return [] as OnGoingGame[];
    });
};

export const getContributions = async (
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
): Promise<Contributions[]> => {
  return authGetRequest<CommonResponse<Contributions[]>>('/games/contributions')
    .then((response) => {
      return response?.data.data ?? ([] as Contributions[]);
    })
    .catch((error: AxiosError) => {
      commonExceptionHandler(error, `/games/contributions`, setErrorState, errorCallback);
      return [] as Contributions[];
    });
};
