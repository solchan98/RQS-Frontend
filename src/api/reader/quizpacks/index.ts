import { IQuizPack } from '../../../types/quizpacks';
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
): Promise<CommonResponse<IQuizPack[]>> => {
  return authGetRequest<CommonResponse<IQuizPack[]>>('quiz-packs', {
    params: { lastId: paginationState.lastId, chunk: paginationState.chunk, searchType },
  })
    .then((response) => {
      const data = response?.data.data ?? []; // 빈 배열로 기본값 설정
      return { data };
    })
    .catch((error) => {
      const axiosError = error as AxiosError;
      const responseError = axiosError.response?.data as IResponseError;

      setErrorState({
        key: 'quiz-packs',
        message: responseError?.message ?? error?.message,
        status: responseError?.status ?? error?.status,
      });

      // 에러 발생 시 빈 배열 반환
      return { data: [] };
    });
};
