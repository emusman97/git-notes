export const REDUCER_PATH = 'gistsApi';

export const BASE_URL = 'https://api.github.com/gists';

export const apiEndpoints = {
  public: '/public',
};

export const baseHeaders = [
  { key: 'Accept', value: 'application/vnd.github.v3+json' },
];

export const AUTH_HEADER_KEY = 'Authorization';
export const getAuthHeaderValue = (token: string) => `token ${token}`;

export const LINK_HEADER_KEY = 'Link';

export const TagTypes = {
  PublicGists: 'PublicGists',
  Gist: 'Gist',
} as const;

export const DEFAULT_GISTS_PER_PAGE = 8;
