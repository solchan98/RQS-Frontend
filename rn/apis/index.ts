import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { eventEmitter } from '../hooks/useGlobalSession';

const baseURL = 'http://localhost:8000/api';
export type IRequestFailResponse = {
  status: number | undefined;
  message: string;
};

export const apiClient = axios.create({ baseURL });

export const authApiClient = axios.create({ baseURL });

export const refreshApiClient = axios.create({ baseURL });

refreshApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    const token = JSON.parse(refreshToken ?? '');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

authApiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    const token = JSON.parse(accessToken ?? '');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // InternalAxiosRequestConfig 반환
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedRequests: Array<{
  resolve: (value: Promise<AxiosResponse<any, any>>) => void;
  reject: (reason?: any) => void;
  originalRequest: AxiosRequestConfig;
}> = [];

authApiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // 토큰 재발급 요청 실패한 상태
    if (isRefreshing && error.request.responseURL.includes('refresh')) {
      // 실패한 요청들을 새 토큰으로 재요청
      for (const { reject } of failedRequests) {
        reject(error); // 실패한 요청은 reject 처리
      }
    }

    const originalRequestConfig = error.config; // 이름 변경

    // originalRequestConfig가 정의되지 않았을 경우 처리
    if (!originalRequestConfig) {
      return Promise.reject(error);
    }

    // 401 에러가 발생했을 때
    if (error.response && error.response.status === 401) {
      if (!isRefreshing && !error.request.responseURL.includes('refresh')) {
        // 토큰 재발급 시작
        isRefreshing = true;

        refreshApiClient
          .post('/refresh', {})
          .then(async (res: AxiosResponse<any, any>) => {
            const newAccessToken: string = res?.data.data.token;

            // 새로운 토큰을 로컬스토리지에 저장
            await AsyncStorage.setItem('accessToken', JSON.stringify(newAccessToken));
            isRefreshing = false;

            for (const { resolve, reject, originalRequest } of failedRequests) {
              originalRequest.headers = originalRequest.headers || {}; // 헤더가 없을 수 있어 초기화
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              try {
                resolve(authApiClient(originalRequest));
              } catch (err) {
                reject(err); // 실패한 요청은 reject 처리
              }
            }
            failedRequests = []; // 실패 요청들 초기화
          })
          .catch(async () => {
            failedRequests.forEach(({ reject }) => reject(error));
            failedRequests = [];
            isRefreshing = false;

            await AsyncStorage.setItem('accessToken', '');
            await AsyncStorage.setItem('refreshToken', '');

            eventEmitter.emit('redirectToLogin');
          });
      }

      return new Promise<AxiosResponse>((resolve, reject) => {
        failedRequests.push({ resolve, reject, originalRequest: originalRequestConfig });
      });
    }
    return Promise.reject(error);
  },
);

const handleApiRequest = async <T>(
  method: 'GET' | 'POST',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => {
  let response: AxiosResponse<T>;

  if (method === 'POST') {
    response = await apiClient.post<T>(url, data, config);
  } else {
    response = await apiClient.get<T>(url, config);
  }

  return response;
};

export const getRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | null> =>
  handleApiRequest<T>('GET', url, undefined, config);

export const postRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => handleApiRequest<T>('POST', url, data, config);

const handleAuthApiRequest = async <T>(
  method: 'GET' | 'POST' | 'PUT',
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => {
  let response: AxiosResponse<T>;

  if (method === 'POST') {
    response = await authApiClient.post<T>(url, data, config);
  } else if (method === 'PUT') {
    response = await authApiClient.put<T>(url, data, config);
  } else {
    response = await authApiClient.get<T>(url, config);
  }

  return response;
};

export const authGetRequest = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T> | null> =>
  handleAuthApiRequest<T>('GET', url, undefined, config);

export const authPostRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => handleAuthApiRequest<T>('POST', url, data, config);

export const authPutRequest = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T> | null> => handleAuthApiRequest<T>('PUT', url, data, config);

export const isRequestFailResponse = (res: any): res is IRequestFailResponse =>
  res && (typeof res.status === 'number' || res.status === undefined) && typeof res.message === 'string';
