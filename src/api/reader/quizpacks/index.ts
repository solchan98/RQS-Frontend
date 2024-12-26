import { IQuizPackDetail, IQuizPackStatus } from '../../../types/quizpacks';
import { authGetRequest } from '../../index';
import { IRequestError } from '../../../recoil/error';
import { CommonResponse } from '../../../types/common/response';
import { IUsePagination } from '../../../types/common/request';
import { AxiosError } from 'axios';
import { commonExceptionHandler } from '../../exceptionHandler';

export const getQuizPacks = async (
  paginationState: IUsePagination,
  searchType: 'MY' | 'ALL',
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
): Promise<IQuizPackStatus[]> => {
  return authGetRequest<CommonResponse<IQuizPackStatus[]>>('quiz-packs', {
    params: { lastId: paginationState.lastId, chunk: paginationState.chunk, searchType },
  })
    .then((response) => {
      return response?.data.data ?? []; // 빈 배열로 기본값 설정
    })
    .catch((error: AxiosError) => {
      commonExceptionHandler(error, `quiz-packs`, setErrorState, errorCallback);
      return [] as IQuizPackStatus[];
    });
};

export const getQuizPackDetails = async (
  quizPackId: number,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
): Promise<IQuizPackDetail> => {
  return authGetRequest<CommonResponse<IQuizPackDetail>>(`quiz-packs/${quizPackId}`)
    .then((response) => {
      // 정상적으로 데이터를 반환
      return response?.data.data ?? ({} as IQuizPackDetail);
    })
    .catch((error: AxiosError) => {
      commonExceptionHandler(error, `quiz-packs/${quizPackId}`, setErrorState, errorCallback);
      return {} as IQuizPackDetail; // 기본값 반환
    });
};
