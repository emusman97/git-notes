import Axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { isError, isObjectNotEmpty } from '@/utils';
import { NetworkErrorMessage } from './constants';
import {
  ApiErrorMessages,
  type ApiFailureResult,
  type ApiRequestConfig,
  type ApiSuccessResult,
  type GeneralApiResponseData,
} from './types';

export const API_SUCCESS_RESULT_SYMBOL = Symbol('api_success');
export const API_FAILURE_RESULT_SYMBOL = Symbol('api_failure');

export function createRequestConfig<D>(requestConfig: ApiRequestConfig<D>) {
  const axiosReqConfig: AxiosRequestConfig = {};

  if (requestConfig.query) {
    axiosReqConfig.params = requestConfig.query;
  }

  axiosReqConfig.withAuth = requestConfig.withAuth;
  axiosReqConfig.accessToken = requestConfig.accessToken;

  if (requestConfig.data && isObjectNotEmpty(requestConfig.data)) {
    axiosReqConfig.data = requestConfig.data;
  }

  return axiosReqConfig;
}

export const createApiSuccessResult = <D>(
  data: D,
  response: AxiosResponse
): ApiSuccessResult<D> => ({
  success: true,
  failure: false,
  code: response.status ?? 200,
  value: data,
  cause: null,
  meta: response,
  [API_SUCCESS_RESULT_SYMBOL]: true,
});

export const createApiFailureResult = (
  result?: Partial<ApiFailureResult>
): ApiFailureResult => ({
  success: false,
  failure: true,
  value: null,
  message: result?.message ?? ApiErrorMessages.General,
  code: result?.code ?? -1,
  cause: result?.cause,
  [API_FAILURE_RESULT_SYMBOL]: true,
});

export function handlerError(error: unknown): ApiFailureResult {
  if (Axios.isAxiosError(error)) {
    const failureResult = createApiFailureResult({ cause: error });
    const statusCode = error.response?.status;

    /**
     * Condition copied from
     * https://github.com/infinitered/apisauce/blob/a9e015a1c6ae649dc521490c41d1054b091f6639/lib/apisauce.ts#L83
     */
    if (error.message === NetworkErrorMessage) {
      failureResult.message = ApiErrorMessages.Network;
      failureResult.code = 0;
    } else if (statusCode) {
      const data = error.response?.data as GeneralApiResponseData;
      failureResult.message = data?.message || ApiErrorMessages.General;
      failureResult.code = statusCode;
    } else {
      failureResult.message = ApiErrorMessages.UnableToSendRequest;
      failureResult.code = -1;
    }

    return failureResult;
  }
  if (isError(error)) {
    return createApiFailureResult({
      message: ApiErrorMessages.UnableToSendRequest,
      code: -1,
      cause: error,
    });
  } else {
    return createApiFailureResult({
      message: ApiErrorMessages.UnableToSendRequest,
      code: -1,
    });
  }
}
