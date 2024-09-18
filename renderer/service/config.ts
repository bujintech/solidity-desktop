import type { CreateRequestConfig } from '@cyberutopian/fetch';

export const reqOptions: CreateRequestConfig = {
  baseURL: '/',
  timeout: 1000 * 60 * 5,
  withCredentials: true,
};
