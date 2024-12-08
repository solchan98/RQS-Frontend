import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

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
): Promise<AxiosResponse<T> | null> => {
  try {
    let response: AxiosResponse<T>;

    if (method === 'POST') {
      response = await apiClient.post<T>(url, data, config);
    } else {
      response = await apiClient.get<T>(url, config);
    }

    return response;
  } catch (error) {
    console.error('API Request failed:', error);
    return null;
  }
};

export const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | null> => {
  return handleApiRequest<T>('GET', url, undefined, config);
};

export const postRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => {
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
    console.error('Auth API Request failed:', error);
    // 예외 처리 후 null 반환 또는 원하는 값 반환
    return null;
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
