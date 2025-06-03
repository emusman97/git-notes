import type { RootState } from '../store';

export const selectUserState = (state: RootState) => state.user;
export const selectIsAuthenticated = (state: RootState) =>
  selectUserState(state).isAuthenticated;
export const selectUserInfo = (state: RootState) =>
  selectUserState(state).details;
export const selectLoading = (state: RootState) =>
  selectUserState(state).loading;
