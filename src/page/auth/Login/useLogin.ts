import { IRequestFailResponse, isRequestFailResponse, postRequest } from '../../../api';
import { useNavigate } from 'react-router-dom';
import { IRequestError } from '../../../recoil/error';

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
    const res = await postRequest<ILoginSuccessResponse>('/login', {
      email,
      password,
    });

    if (isRequestFailResponse(res)) {
      setErrorState({ key: 'login', status: Number(res.status), message: res.message });
      return;
    }

    const tokens = res?.data.data as ILoginSuccessToken;

    localStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));

    navigate('/');
  };

  return { login };
};
