import { IRequestFailResponse, postRequest } from '../../../api';
import { useNavigate } from 'react-router-dom';

interface IUseLoginProps {
  onAlert: (message: string, period?: number) => void;
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

function isRequestFailResponse(res: any): res is IRequestFailResponse {
  return res && (typeof res.status === 'number' || res.status === undefined) && typeof res.message === 'string';
}

export const useLogin = ({ onAlert }: IUseLoginProps) => {
  const navigate = useNavigate();

  const login = async ({ email, password }: ILogin) => {
    const res = await postRequest<ILoginSuccessResponse>('/login', {
      email,
      password,
    });

    if (isRequestFailResponse(res)) {
      onAlert(res.message);
      return;
    }

    const tokens = res.data.data;

    localStorage.setItem('assessToken', JSON.stringify(tokens.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));

    navigate('/');
  };

  return { login };
};
