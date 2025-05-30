import type { RootState } from '../store';

export const selectUserState = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) =>
  selectUserState(state).isAuthenticated;
