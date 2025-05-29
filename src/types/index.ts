declare module 'axios' {
  interface AxiosRequestConfig {
    withAuth?: boolean;
    accessToken?: string;
  }
}

export interface SuccessResult<D, C> {
  success: true;
  failure: false;
  value?: D;
  code?: C;
  cause: null;
}

export interface FailureResult<C, E> {
  success: false;
  failure: true;
  message: string;
  value: null;
  code: C;
  cause?: E;
}

export type Result<D, C, E> = SuccessResult<D, C> | FailureResult<C, E>;

export type Callback = () => void;
