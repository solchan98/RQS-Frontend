import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type IRequestFailResponse = {
  status: number | undefined;
  message: string;
};

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

export const refreshApiClient = axios.create({
  baseURL: 'http://localhost:8080',
});
refreshApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = JSON.parse(localStorage.getItem('refreshToken') ?? '');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export const authApiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

authApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = JSON.parse(localStorage.getItem('accessToken') ?? '');
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
          .post(
            '/refresh',
            {},
            {
              headers: { authorization: `Bearer ${localStorage.getItem('refreshToken')}` },
            },
          )
          .then((res: AxiosResponse<any, any>) => {
            const newAccessToken: string = res?.data.data.token;

            // 새로운 토큰을 로컬스토리지에 저장
            localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
            isRefreshing = false;

            for (const { resolve, reject, originalRequest } of failedRequests) {
              originalRequest.headers = originalRequest.headers || {}; // 헤더가 없을 수 있어 초기화
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              try {
                resolve(authApiClient(originalRequest)); // 요청이 성공하면 resolve
              } catch (err) {
                reject(err); // 실패한 요청은 reject 처리
              }
            }
            failedRequests = []; // 실패 요청들 초기화
          })
          .catch((err) => {
            failedRequests.forEach(({ reject }) => reject(err)); // 재발급 실패한 요청을 처리
            failedRequests = [];
            isRefreshing = false;

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            window.dispatchEvent(new CustomEvent('redirectToLogin'));
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
  let response: AxiosResponse<T>;

  if (method === 'POST') {
    response = await authApiClient.post<T>(url, data, config);
  } else {
    response = await authApiClient.get<T>(url, config);
  }

  return response;
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
