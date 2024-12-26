import { IRequestFailResponse, isRequestFailResponse, postRequest } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { IRequestError } from '../../../recoil/error';
import { AxiosError } from 'axios';
import { IResponseError } from '../../../types/error';

interface IUseLoginProps {
  setErrorState: (error: IRequestError, clearTime?: number) => void;
}

interface ILogin {
  email: string;
  password: string;
}

interface ILoginSuccessResponse {
  message: string;
  data: ILoginSuccessToken;
}

interface ILoginSuccessToken {
  accessToken: string;
  refreshToken: string;
}

export const useLogin = ({ setErrorState }: IUseLoginProps) => {
  const navigate = useNavigate();

  const login = async ({ email, password }: ILogin) => {
    postRequest<ILoginSuccessResponse>('/login', {
      email,
      password,
    })
      .then((response) => {
        const tokens = response?.data.data as ILoginSuccessToken;

        localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
        localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));

        navigate('/');
      })
      .catch((error: AxiosError) => {
        const responseError = error.response?.data as IResponseError;
        const errorState = responseError?.status ?? error.status;
        const errorMessage = responseError?.message ?? error.message;

        setErrorState({ key: 'login', status: errorState, message: errorMessage });
      });
  };

  return { login };
};
