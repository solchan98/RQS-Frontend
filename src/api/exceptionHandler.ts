import { AxiosError } from 'axios';
import { IResponseError } from '../types/error';
import { IRequestError } from '../recoil/error';

export const commonExceptionHandler = (
  error: AxiosError,
  errorStateKey: string,
  setErrorState: (error: IRequestError, clearTime?: number) => void,
  errorCallback: () => void,
) => {
  const responseError = error.response?.data as IResponseError;
  const errorState = responseError?.status ?? error.status;
  const errorMessage = responseError?.message ?? error.message;

  if (errorState === 401 && !error.request.responseURL.includes('login')) {
    errorCallback();
    return;
  }

  setErrorState({ key: errorStateKey, status: errorState, message: errorMessage });
  errorCallback();
};
