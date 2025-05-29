import { Gists } from './gists';
import { type ApiResult } from './types';

export const ApiService = {
  handleApiResult<T>(res: ApiResult<T>): Promise<T> {
    return (res.success ? res.value : Promise.reject(res)) as Promise<T>;
  },

  Gists,
} as const;
