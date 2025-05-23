import type { FirebaseUser } from '@/core';

export interface User {
  id?: string;
  name?: string;
  avatar?: string;
}

export const createUser = (from: FirebaseUser): User => ({
  id: from.uid,
  name: from.displayName ?? '',
  avatar: from.photoURL ?? '',
});
