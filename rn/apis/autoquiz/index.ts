import { AxiosError } from 'axios';
import { IAddAutoCreateQuizPackResult, IAutoQuizPack, IAutoQuizTask } from '@/(1app)/(creationquiz)/index.types';
import { authGetRequest, authPostRequest, authPutRequest } from '../index';
import { CommonErrorResponse, CommonResponse } from '../../types/common/response';

export const queryAutoQuizPack = async (
  taskId: number,
  errorCallback: (message: string) => void,
): Promise<IAutoQuizPack> =>
  authGetRequest<CommonResponse<IAutoQuizPack>>(`/auto-quiz/task/${taskId}/quiz-pack`, {})
    .then((response) => response?.data.data ?? ({} as IAutoQuizPack))
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      throw error;
    });

export const queryAutoQuizTask = async (
  taskStatuses: string[],
  errorCallback: (message: string) => void,
): Promise<IAutoQuizTask[]> =>
  authGetRequest<CommonResponse<IAutoQuizTask[]>>(`/auto-quiz/task`, {
    params: { 'task-statuses': taskStatuses },
  })
    .then((response) => {
      const result = response?.data.data ?? ([] as IAutoQuizTask[]);
      // TODO: string -> Date로 바꾸는 부분 공통 처리하도록 고민해보기
      return result.map((value) => ({
        ...value,
        createdAt: new Date(value.createdAt),
        updatedAt: new Date(value.updatedAt),
      }));
    })
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      return [] as IAutoQuizTask[];
    });

export const commandCheckTask = async (taskId: number, errorCallback: (message: string) => void) =>
  authPostRequest(`/auto-quiz/task/${taskId}/check`, {}).catch((error: AxiosError<CommonErrorResponse<boolean>>) => {
    const errorMessage = error.response?.data?.message ?? error.message;
    errorCallback(errorMessage);
    throw error;
  });

export const commandAddAutoCreateQuizTask = async (
  quizPackTitle: string,
  base64: string,
  mineType: string,
  errorCallback: (message: string) => void,
): Promise<IAddAutoCreateQuizPackResult> =>
  authPostRequest<CommonResponse<IAddAutoCreateQuizPackResult>>('/auto-quiz', {
    quizPackTitle,
    base64,
    mineType,
  })
    .then((response) => {
      const result = response?.data.data ?? ({} as IAddAutoCreateQuizPackResult);

      // TODO: string -> Date로 바꾸는 부분 공통 처리하도록 고민해보기
      return { ...result, createdAt: new Date(result.createdAt), updatedAt: new Date(result.updatedAt) };
    })
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      throw error;
    });

export const commandUpdateAutoCreateQuizTask = async (
  autoQuizPack: IAutoQuizPack,
  errorCallback: (message: string) => void,
): Promise<IAutoQuizPack> =>
  authPutRequest<CommonResponse<IAutoQuizPack>>('/auto-quiz/auto-quiz-pack', {
    ...autoQuizPack,
  })
    .then((response) => response?.data.data ?? ({} as IAutoQuizPack))
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      throw error;
    });

export const commandPublishAutoCreateQuizTask = async (
  autoQuizPackId: number,
  errorCallback: (message: string) => void,
): Promise<number> =>
  authPostRequest<CommonResponse<number>>(`/auto-quiz/auto-quiz-pack/${autoQuizPackId}/quiz-pack`, {})
    .then((response) => response?.data.data ?? 0)
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      throw error;
    });
