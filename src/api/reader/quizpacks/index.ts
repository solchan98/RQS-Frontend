import { IQuizPack } from '../../../types/quizpacks';
import { authGetRequest } from '../../index';
import { AxiosError } from 'axios';
import { IRequestError } from '../../../recoil/error';
import { IResponseError } from '../../../types/error';
import { PaginationData } from '../../../types/common/response';
import { IUsePagination } from '../../../types/common/request';

export const getQuizPacks = async (
  paginationState: IUsePagination,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
): Promise<PaginationData<IQuizPack[]>> => {
  return authGetRequest<PaginationData<IQuizPack[]>>('quiz-packs', {
    params: { lastId: paginationState.lastId, chunk: paginationState.chunk },
  })
    .then((response) => {
      const data = response?.data.data ?? []; // 빈 배열로 기본값 설정
      const pagination = response?.data.pagination ?? paginationState;
      return { data, pagination };
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
      return { data: [], pagination: paginationState };
    });
};
