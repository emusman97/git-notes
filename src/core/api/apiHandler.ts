import { LocalStorageKeys, LocalStorageService } from '../localStorageService';
import { createApiReqHandler } from './common';
import { BASE_URL } from './constants';

export const GistsApiHandler = createApiReqHandler({
  baseUrl: BASE_URL,
  baseHeaders: {
    Accept: 'application/vnd.github.v3+json',
  },
  addTokenInterceptor: true,
  getAuthHeaderValue() {
    const token = LocalStorageService.getString(LocalStorageKeys.GithubToken);

    return token?.trim() === '' ? '' : `token ${token}`;
  },
});
