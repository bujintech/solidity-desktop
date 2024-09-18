import { Request, setup } from '@cyberutopian/fetch';
import { message } from 'antd';
import { reqOptions } from './config';

const request = new Request({
  baseURL: reqOptions.baseURL,
  timeout: reqOptions.timeout,
  withCredentials: reqOptions.withCredentials,
  interceptors: {
    requestInterceptors: (config) => {
      const { method = 'GET' } = config;
      if (method === 'get' || method === 'GET') {
        config.params = config.data;
      }

      return config;
    },
    responseInterceptors: (result) => {
      return result;
    },
    responseInterceptorsCatch(err) {
      console.error(err);
      message.error('系统异常，请稍后重试');
      return { ...err, data: { code: 500, err: '系统异常，请稍后重试' } };
    },
  },
});

// @ts-ignore
setup(request);

export { fetch as cyberFetch, useFetch as useCyberFetch } from '@cyberutopian/fetch';
