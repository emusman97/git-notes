import { AxiosError, type AxiosResponse } from 'axios';
import type { SuccessResult, FailureResult } from '@/types';

export const ApiErrorMessages = {
  General: 'Something went wrong',
  Network: 'Network error',
  RequestAlreadyExists: 'Request already exists',
  UnableToSendRequest: 'Unable to send request',
  BadRequest: 'The data entered is invalid',
} as const;

export const HttpMethods = {
  Get: 'Get',
  Post: 'Post',
  Put: 'Put',
  Patch: 'Patch',
  Delete: 'Delete',
} as const;

export type ApiErrorMessage = keyof typeof ApiErrorMessages;
export type HttpMethod = keyof typeof HttpMethods;

type ApiRequestConfigBase = {
  endpoint: string;
  method: HttpMethod;
  withAuth: boolean;
  accessToken?: string;
  query?: Record<string, string>;
};

export type ApiRequestConfig<D> = D extends undefined
  ? ApiRequestConfigBase & { data?: D }
  : ApiRequestConfigBase & { data: D };

export type ApiSuccessResult<D> = SuccessResult<D, number> & {
  code: number;
  meta: AxiosResponse<D>;
};

export type ApiFailureResult = FailureResult<
  number,
  undefined | AxiosError | Error
>;

export type ApiResult<R> = ApiSuccessResult<R> | ApiFailureResult;

export type CustomErrorHandler = (error: unknown) => ApiFailureResult;

export type GeneralApiResponseData = { message?: string };

export type GeneralApiResponse<D = unknown> = {
  error?: string;
  message?: string;
  data?: D;
};

export interface CreateApiReqHandlerParams {
  baseUrl: string;
  baseHeaders?: Record<string, string>;
  addTokenInterceptor: boolean;
  getAuthHeaderValue: () => string;
}
