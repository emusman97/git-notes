import { FirebaseService, LocalStorageKeys, LocalStorageService } from '@/core';
import { createUser } from '@/models';
import {
  selectLoading,
  store,
  useAppDispatch,
  userActions,
  useUserState,
} from '@/state';
import { useEffect } from 'react';

export function useAuthStateChange() {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useUserState();

  useEffect(
    () =>
      FirebaseService.Auth.addOnAuthChangeListener(async (user) => {
        if (user) {
          const loginInProgress = selectLoading(store.getState());

          if (isAuthenticated === false && loginInProgress === false) {
            dispatch(userActions.login(createUser(user)));
          }
        } else if (isAuthenticated) {
          dispatch(userActions.setIsAuthenticated(false));
          LocalStorageService.clearString(LocalStorageKeys.GithubToken);
        }
      }),
    [dispatch, isAuthenticated]
  );
}
