export const LocalStorageKeys = {
  GithubToken: 'user/github_token',
} as const;

export type LocalStorageKey = keyof typeof LocalStorageKeys;
