import { type LocalStorageKey } from './types';

function createLocalStorageService() {
  const setString = (key: LocalStorageKey, value: string) => {
    localStorage.setItem(key, value);
  };
  const getString = (key: LocalStorageKey) => {
    return localStorage.getItem(key);
  };
  const clearString = (key: LocalStorageKey) => {
    localStorage.setItem(key, '');
  };

  return { setString, getString, clearString };
}

export const LocalStorageService = createLocalStorageService();

export * from './types';
