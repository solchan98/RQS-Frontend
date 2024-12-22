import { IQuizPackDetail, IQuizPackStatus } from '../../../types/quizpacks';
import { authGetRequest } from '../../index';
import { AxiosError } from 'axios';
import { IRequestError } from '../../../recoil/error';
import { IResponseError } from '../../../types/error';
import { CommonResponse } from '../../../types/common/response';
import { IUsePagination } from '../../../types/common/request';

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
    .catch((error) => catchHandler(error, `quiz-packs`, setErrorState));
};

export const getQuizPackDetails = async (
  quizPackId: number,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
): Promise<CommonResponse<IQuizPackDetail[]>> => {
  return authGetRequest<CommonResponse<IQuizPackDetail[]>>(`quiz-packs/${quizPackId}`)
    .then((response) => {
      const data = response?.data.data ?? []; // 빈 배열로 기본값 설정
      return { data };
    })
    .catch((error) => catchHandler(error, `quiz-packs/${quizPackId}`, setErrorState));
};

const catchHandler = (
  error: AxiosError,
  key: string,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
) => {
  const axiosError = error as AxiosError;
  const responseError = axiosError.response?.data as IResponseError;

  setErrorState({
    key,
    message: responseError?.message ?? error?.message,
    status: responseError?.status ?? error?.status,
  });

  // 에러 발생 시 빈 배열 반환
  return { data: [] };
};
