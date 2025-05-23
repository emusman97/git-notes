import { FirebaseService, LocalStorageService } from '@/core';
import { createUser } from '@/models';
import { useAppDispatch, userActions, useUserState } from '@/state';
import { useEffect } from 'react';

export function useAuthStateChange() {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useUserState();

  useEffect(
    () =>
      FirebaseService.Auth.addOnAuthChangeListener(async (user) => {
        if (user) {
          if (isAuthenticated === false) {
            dispatch(userActions.login(createUser(user)));
          }
        } else if (isAuthenticated) {
          dispatch(userActions.setIsAuthenticated(false));
          LocalStorageService.clearString('GithubToken');
        }
      }),
    [dispatch, isAuthenticated]
  );
}
