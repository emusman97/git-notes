import type { GistId } from '@/models';

export const BASE_URL = 'https://api.github.com/gists';

export const NetworkErrorMessage = 'Network Error';

export const BASE_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const pathWithId = (id: GistId, resource: string) => `/${id}/${resource}`;

export const ApiEndpoints = {
  Root: '',
  Public: '/public',
  Star: (gistId: GistId) => pathWithId(gistId, 'star'),
  Forks: (gistId: GistId) => pathWithId(gistId, 'forks'),
} as const;
