import type { User } from '@/models';

export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  details?: User;
}
