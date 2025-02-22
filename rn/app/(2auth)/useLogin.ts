import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { AxiosError } from 'axios';
import { postRequest } from '../../apis';

import useGlobalSession from '../../hooks/useGlobalSession';

import { CommonErrorResponse } from '../../types/common/response';

interface Login {
  email: string;
  password: string;
}

interface LoginSuccessResponse {
  message: string;
  data: LoginSuccessToken;
}

interface LoginSuccessToken {
  accessToken: string;
  refreshToken: string;
}

const useLogin = () => {
  const { setSession, clearSession } = useGlobalSession();

  const login = async ({ email, password }: Login, errorCallback: (errorMessage: string) => void) => {
    postRequest<LoginSuccessResponse>('/login', {
      email,
      password,
    })
      .then(async (response) => {
        const tokens = response?.data.data as LoginSuccessToken;

        await AsyncStorage.setItem('accessToken', JSON.stringify(tokens.accessToken));
        await AsyncStorage.setItem('refreshToken', JSON.stringify(tokens.refreshToken));
        setSession({ accessToken: tokens.accessToken });

        router.replace('/(1app)');
      })
      .catch((error: AxiosError<CommonErrorResponse<void>>) => {
        const errorMessage = error.response?.data?.message ?? error.message;
        errorCallback(errorMessage);
      });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');

    clearSession();
  };

  return { login, clearSession };
};

export default useLogin;
