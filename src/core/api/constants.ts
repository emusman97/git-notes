export const BASE_URL = 'https://api.github.com/gists';

export const NetworkErrorMessage = 'Network Error';

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export const ApiEndpoints = {
  Root: '',
  Public: '/public',
} as const;
