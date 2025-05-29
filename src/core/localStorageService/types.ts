export const LocalStorageKeys = {
  GithubToken: 'user/github_token',
} as const;

export type LocalStorageKey =
  (typeof LocalStorageKeys)[keyof typeof LocalStorageKeys];
