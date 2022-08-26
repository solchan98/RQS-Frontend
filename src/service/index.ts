import axios, { AxiosRequestConfig } from 'axios';
import store from 'store';

const BASE_URL = String(process.env.REACT_APP_BASE_URL);

const base = (url: string, options?: AxiosRequestConfig) => axios.create({ baseURL: url, ...options });

const atk = store.get('atk');

const auth = (url: string, options?: AxiosRequestConfig) =>
  axios.create({
    baseURL: url,
    headers: {
      Authorization: `bearer ${atk}`,
    },
    ...options,
  });

export const baseApi = base(BASE_URL);
export const authApi = auth(BASE_URL);
