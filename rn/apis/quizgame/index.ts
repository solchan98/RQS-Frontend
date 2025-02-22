import { AxiosError } from 'axios';
import { IOnGoingGame } from '@/(1app)/components/index.types';
import { IGameQuiz } from '@/(1app)/(quizpacks)/(quizgame)/index.types';
import { authGetRequest, authPostRequest } from '../index';
import { CommonErrorResponse, CommonResponse } from '../../types/common/response';
import { IContributions } from '../../components/BlockCalender/BlockCalender.types';

export const commandSubmitGameQuiz = async (
  quizGameId: string,
  optionIds: number[],
  errorCallback: (message: string) => void,
): Promise<void> =>
  authPostRequest(`/core/games/${quizGameId}/submission`, {
    optionIds,
  })
    .then(() => {})
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      throw error;
    });

export const commandStartGameQuiz = async (
  quizPackId: number,
  quizPickStrategy: 'SEQUENCE_PICK' | 'RANDOM_PICK',
  errorCallback: (message: string) => void,
): Promise<string> =>
  authPostRequest<CommonResponse<{ quizGameId: string }>>('/core/games', {
    quizPackId,
    quizPickStrategy,
  })
    .then((response) => response?.data.data.quizGameId ?? '')
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;

      errorCallback(errorMessage);
      throw error;
    });

export const commandNextGameQuiz = async (
  quizGameId: string,
  errorCallback: (message: string) => void,
): Promise<IGameQuiz> =>
  authPostRequest<CommonResponse<IGameQuiz>>(`/core/games/${quizGameId}/next-quiz`, {})
    .then((response) => {
      const result = response?.data.data ?? ({} as IGameQuiz);
      // TODO: string -> Date로 바꾸는 부분 공통 처리하도록 고민해보기
      return { ...result, lastUpdatedAt: new Date(result.startedAt) };
    })
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;

      errorCallback(errorMessage);
      return {} as IGameQuiz;
    });

export const queryOnGoingQuizGames = async (errorCallback: (message: string) => void): Promise<IOnGoingGame[]> =>
  authGetRequest<CommonResponse<IOnGoingGame[]>>('/core/games')
    .then((response) => {
      const result = response?.data.data ?? ([] as IOnGoingGame[]);
      // TODO: string -> Date로 바꾸는 부분 공통 처리하도록 고민해보기
      return result.map((value) => ({ ...value, lastUpdatedAt: new Date(value.lastUpdatedAt) }));
    })
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      return [] as IOnGoingGame[];
    });

export const queryContributions = async (errorCallback: (message: string) => void): Promise<IContributions[]> =>
  authGetRequest<CommonResponse<IContributions[]>>('/core/games/contributions')
    .then((response) => response?.data.data ?? ([] as IContributions[]))
    .catch((error: AxiosError<CommonErrorResponse<void>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      return [] as IContributions[];
    });
