import { useContext } from 'react';
import { AlertContext } from './context';

export function useAlertContext() {
  const ctx = useContext(AlertContext);

  if (!ctx) {
    throw new Error(
      'You have forgot to wrap your app with `AlertContextProvider`'
    );
  }

  return ctx;
}
