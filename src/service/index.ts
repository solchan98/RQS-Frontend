import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = String(process.env.REACT_APP_BASE_URL);

const base = (url: string, options?: AxiosRequestConfig) => axios.create({ baseURL: url, ...options });

export const baseApi = base(BASE_URL);
