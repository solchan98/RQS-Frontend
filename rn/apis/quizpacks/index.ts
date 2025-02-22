import { AxiosError } from 'axios';
import { IQuizPack } from '@/(1app)/(quizpacks)/index.types';
import { authGetRequest } from '../index';
import { CommonErrorResponse, CommonResponse } from '../../types/common/response';
import { IPaginationProps } from '../../hooks/usePagination';

export const queryQuizPacks = async (
  paginationState: IPaginationProps,
  searchType: 'MY' | 'ALL',
  errorCallback: (message: string) => void,
): Promise<IQuizPack[]> =>
  authGetRequest<CommonResponse<IQuizPack[]>>('/core/quiz-packs', {
    params: { lastId: paginationState.lastId, chunk: paginationState.chunk, searchType },
  })
    .then((response) => {
      const result = response?.data.data ?? ([] as IQuizPack[]);
      // TODO: string -> Date로 바꾸는 부분 공통 처리하도록 고민해보기
      return result.map((value) => ({ ...value, createdAt: new Date(value.createdAt) }));
    })
    .catch((error: AxiosError<CommonErrorResponse<null>>) => {
      const errorMessage = error.response?.data?.message ?? error.message;
      errorCallback(errorMessage);
      return [] as IQuizPack[];
    });
//
// export const getQuizPackDetails = async (
//   quizPackId: number,
//   setErrorState: (error: IRequestError, clearTime?: number) => void,
//   errorCallback: () => void,
// ): Promise<IQuizPackDetail> => {
//   return authGetRequest<CommonResponse<IQuizPackDetail>>(`quiz-packs/${quizPackId}`)
//     .then((response) => {
//       // 정상적으로 데이터를 반환
//       return response?.data.data ?? ({} as IQuizPackDetail);
//     })
//     .catch((error: AxiosError) => {
//       commonExceptionHandler(error, `quiz-packs/${quizPackId}`, setErrorState, errorCallback);
//       return {} as IQuizPackDetail; // 기본값 반환
//     });
// };
//
// export const addAutoQuizCreateTask = async (
//   keywords: IChip[],
//   setErrorState: (error: IRequestError, clearTime?: number) => void,
//   errorCallback: () => void,
// ): Promise<number> => {
//   return authPostRequest<CommonResponse<number>>('/quizzes/auto', {
//     keywords,
//   })
//     .then((response) => {
//       return response?.data.data ?? 0;
//     })
//     .catch((error: AxiosError) => {
//       commonExceptionHandler(error, '/quizzes/auto', setErrorState, errorCallback);
//       return 0;
//     });
// };
