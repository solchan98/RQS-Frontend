import { IQuizPack } from '../../../types/quizpacks';
import { authGetRequest } from '../../index';
import { AxiosError, AxiosResponse } from 'axios';
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

      setErrorState({ key: 'quiz-packs', message: responseError?.message, status: responseError?.status });

      // 에러 발생 시 빈 배열 반환
      return { data: [], pagination: paginationState };
    });

  // try {
  //   // authGetRequest 호출 및 결과 처리
  //   const response = await authGetRequest<PaginationData<IQuizPack[]>>('quiz-packs', {
  //     params: { lastId: paginationState.lastId, chunk: paginationState.chunk },
  //   });
  //
  //   // response가 없거나 data가 undefined인 경우 빈 배열 반환
  //   const data = response?.data.data ?? []; // 빈 배열로 기본값 설정
  //   const pagination = response?.data.pagination ?? paginationState;
  //
  //   console.log(`hello`);
  //   return { data, pagination };
  // } catch (error) {
  //   const axiosError = error as AxiosError;
  //   const responseError = axiosError.response?.data as IResponseError;
  //
  //   setErrorState({ key: 'quiz-packs', message: responseError?.message, status: responseError?.status });
  //
  //   // 에러 발생 시 빈 배열 반환
  //   return { data: [], pagination: paginationState };
  // }
};
