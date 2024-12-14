import { useRecoilState } from 'recoil';
import { IRequestError, requestErrorsState } from '../recoil/error';

export const useErrorRequest = () => {
  const [errorsState, setErrorsState] = useRecoilState(requestErrorsState);

  const setErrorState = (error: IRequestError, clearTime = 3000) => {
    setErrorsState((prevErrors) => {
      const updatedErrors = { ...prevErrors, [error.key]: error };

      setTimeout(() => {
        const { [error.key]: _, ...remainingErrors } = updatedErrors;
        setErrorsState(remainingErrors);
      }, clearTime);

      return updatedErrors;
    });
  };

  return { errorsState, setErrorState };
};
