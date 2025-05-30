import Axios, { type AxiosResponse } from 'axios';
import { BASE_HEADERS } from './constants';
import {
  HttpMethods,
  type ApiRequestConfig,
  type ApiResult,
  type CreateApiReqHandlerParams,
  type CustomErrorHandler,
  type GeneralApiResponse,
} from './types';
import {
  createApiSuccessResult,
  createRequestConfig,
  handlerError,
} from './utils';

export function createApiReqHandler({
  baseUrl,
  baseHeaders,
  addTokenInterceptor,
  getAuthHeaderValue,
}: CreateApiReqHandlerParams) {
  const axios = Axios.create({
    baseURL: baseUrl,
    headers: baseHeaders ? baseHeaders : BASE_HEADERS,
  });

  if (addTokenInterceptor) {
    axios.interceptors.request.use((req) => {
      if (req.withAuth) {
        const authHeaderValue = getAuthHeaderValue();
        if (authHeaderValue === '') {
          const controller = new AbortController();

          controller.abort('You forgot to set valid token');

          return { ...req, signal: controller.signal };
        }

        req.headers.Authorization = authHeaderValue;
      }

      return req;
    });
  }

  const doGet = <R, D>(requestConfig: ApiRequestConfig<D>) => {
    const config = createRequestConfig(requestConfig);
    return axios.get<unknown, R>(requestConfig.endpoint, config);
  };

  const doPost = <R, D>(requestConfig: ApiRequestConfig<D>) => {
    const config = createRequestConfig(requestConfig);
    return axios.post<unknown, R>(
      requestConfig.endpoint,
      requestConfig.data,
      config
    );
  };

  const doPut = <R, D>(requestConfig: ApiRequestConfig<D>) => {
    const config = createRequestConfig(requestConfig);
    return axios.put<unknown, R>(
      requestConfig.endpoint,
      requestConfig.data,
      config
    );
  };

  const doPatch = <R, D>(requestConfig: ApiRequestConfig<D>) => {
    const config = createRequestConfig(requestConfig);
    return axios.patch<unknown, R>(
      requestConfig.endpoint,
      requestConfig.data,
      config
    );
  };

  const doDelete = <R, D>(requestConfig: ApiRequestConfig<D>) => {
    const config = createRequestConfig(requestConfig);
    return axios.delete<unknown, R>(requestConfig.endpoint, config);
  };

  const _makeApiRequest = async <D, R>(
    requestConfig: ApiRequestConfig<D>,
    errorHandler?: CustomErrorHandler
  ): Promise<ApiResult<R>> => {
    try {
      let res: AxiosResponse<R>;

      switch (requestConfig.method) {
        case HttpMethods.Get:
          res = await doGet<AxiosResponse<R>, D>(requestConfig);
          break;
        case HttpMethods.Post:
          res = await doPost<AxiosResponse<R>, D>(requestConfig);
          break;
        case HttpMethods.Put:
          res = await doPut<AxiosResponse<R>, D>(requestConfig);
          break;
        case HttpMethods.Patch:
          res = await doPatch<AxiosResponse<R>, D>(requestConfig);
          break;
        case HttpMethods.Delete:
          res = await doDelete<AxiosResponse<R>, D>(requestConfig);
          break;
        default:
          throw new Error('Invalid Http Method');
      }

      return createApiSuccessResult(res.data, res);
    } catch (error) {
      return errorHandler ? errorHandler(error) : handlerError(error);
    }
  };

  const makeApiRequest = <R = GeneralApiResponse, D = undefined>(
    requestConfig: ApiRequestConfig<D>,
    errorHandler?: CustomErrorHandler
  ) => _makeApiRequest<D, R>(requestConfig, errorHandler);

  return {
    makeApiRequest,
  };
}
