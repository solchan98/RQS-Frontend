import { IQuizPackDetail, IQuizPackStatus } from '../../../types/quizpacks';
import { authGetRequest } from '../../index';
import { IRequestError } from '../../../recoil/error';
import { CommonResponse } from '../../../types/common/response';
import { IUsePagination } from '../../../types/common/request';
import { AxiosError } from 'axios';
import { IResponseError } from '../../../types/error';

export const getQuizPacks = async (
  paginationState: IUsePagination,
  searchType: 'MY' | 'ALL',
  setErrorState: (error: IRequestError, clearTime?: number) => void,
): Promise<CommonResponse<IQuizPackStatus[]>> => {
  return authGetRequest<CommonResponse<IQuizPackStatus[]>>('quiz-packs', {
    params: { lastId: paginationState.lastId, chunk: paginationState.chunk, searchType },
  })
    .then((response) => {
      const data = response?.data.data ?? []; // 빈 배열로 기본값 설정
      return { data };
    })
    .catch((error) => catchHandler(error, `quiz-packs`, setErrorState, { data: [] }, () => {}));
};

export const getQuizPackDetails = async (
  quizPackId: number,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  callback: (error: AxiosError) => void,
): Promise<CommonResponse<IQuizPackDetail>> => {
  return authGetRequest<CommonResponse<IQuizPackDetail>>(`quiz-packs/${quizPackId}`)
    .then((response) => {
      const data = response?.data.data ?? ({} as IQuizPackDetail); // 빈 배열로 기본값 설정
      return { data };
    })
    .catch((error) =>
      catchHandler(error, `quiz-packs/${quizPackId}`, setErrorState, { data: {} as IQuizPackDetail }, callback),
    );
};

const catchHandler = <T>(
  error: AxiosError,
  key: string,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorReturnState: T,
  callback: (error: AxiosError) => void,
): T => {
  const axiosError = error as AxiosError;
  const responseError = axiosError.response?.data as IResponseError;

  if (axiosError.status !== 401) {
    setErrorState({
      key,
      message: responseError?.message ?? axiosError?.message,
      status: responseError?.status ?? axiosError?.status,
    });
  }
  callback(error);

  return errorReturnState;
};
