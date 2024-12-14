import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export type IRequestFailResponse = {
  status: number | undefined;
  message: string;
};

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export const authApiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});

const handleApiRequest = async <T>(
  method: 'GET' | 'POST',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | IRequestFailResponse> => {
  try {
    let response: AxiosResponse<T>;

    if (method === 'POST') {
      response = await apiClient.post<T>(url, data, config);
    } else {
      response = await apiClient.get<T>(url, config);
    }

    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;

      return {
        status,
        message: errorMessage ?? 'An unknown error occurred',
      };
    }

    return {
      status: 500,
      message: 'An unknown error occurred',
    };
  }
};

export const getRequest = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | IRequestFailResponse> => {
  return handleApiRequest<T>('GET', url, undefined, config);
};

export const postRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | IRequestFailResponse> => {
  return handleApiRequest<T>('POST', url, data, config);
};

const handleAuthApiRequest = async <T>(
  method: 'GET' | 'POST',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => {
  try {
    let response: AxiosResponse<T>;

    if (method === 'POST') {
      response = await authApiClient.post<T>(url, data, config);
    } else {
      response = await authApiClient.get<T>(url, config);
    }

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authGetRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | null> => {
  return handleAuthApiRequest<T>('GET', url, undefined, config);
};

export const authPostRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => {
  return handleAuthApiRequest<T>('POST', url, data, config);
};

export const isRequestFailResponse = (res: any): res is IRequestFailResponse => {
  return res && (typeof res.status === 'number' || res.status === undefined) && typeof res.message === 'string';
};
