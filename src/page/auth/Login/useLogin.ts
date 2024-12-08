import { postRequest } from '../../../api';

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

export const useLogin = () => {
  const login = async ({ email, password }: ILogin) => {
    const res = await postRequest<ILoginSuccessResponse>('/login', {
      email,
      password,
    });

    if (res === null) {
      // TODO exception handling
      return;
    }

    const tokens = res.data.data;

    localStorage.setItem('assessToken', JSON.stringify(tokens.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));
  };

  return { login };
};
