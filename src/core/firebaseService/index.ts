import { Auth } from './auth';

function createFirebaseService() {
  return {
    Auth,
  };
}

export const FirebaseService = createFirebaseService();

export * from './auth/types';
