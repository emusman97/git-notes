export const BASE_URL = 'https://api.github.com';

export const NetworkErrorMessage = 'Network Error';

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const GISTS = '/gists';

export const ApiEndpoints = {
  Root: GISTS,
  Public: `${GISTS}/public`,
} as const;
