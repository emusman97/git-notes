import { isError } from '@/utils';
import {
  GithubAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  type AuthError,
} from 'firebase/auth';
import { firebaseAuth } from '../common';
import { githubOAuthScopes, UNKNOWN_ERROR_CODE } from '../constants';
import type {
  FirebaseUser,
  OnAuthStateChangedListener,
  SignInWithGithubFailureResult,
  SignInWithGithubResult,
} from './types';
import { UNKNOWN_ERROR_MESSAGE } from '@/constants';

function createAuth() {
  const provider = new GithubAuthProvider();
  githubOAuthScopes.forEach((scope) => provider.addScope(scope));
  provider.setCustomParameters({
    allow_signup: 'false',
  });

  const signInWithGithub = async (): Promise<SignInWithGithubResult> => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      const cred = GithubAuthProvider.credentialFromResult(result);
      let accessToken;

      if (cred) {
        accessToken = cred.accessToken;
      }

      return {
        success: true,
        failure: false,
        value: { accessToken, user: result.user },
        cause: null,
      };
    } catch (error) {
      const failureResult: SignInWithGithubFailureResult = {
        success: false,
        failure: true,
        code: UNKNOWN_ERROR_CODE,
        message: UNKNOWN_ERROR_MESSAGE,
        value: null,
      };

      if (isError(error)) {
        const authError = error as AuthError;
        failureResult.code = authError.code;
        failureResult.message = authError.message;
      }

      return failureResult;
    }
  };
  const logout = async () => {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      console.log('Error logging out', error);
    }
  };

  const addOnAuthChangeListener = (listener: OnAuthStateChangedListener) =>
    onAuthStateChanged(firebaseAuth, (user) => listener(user));

  const getUser = (): FirebaseUser | null => firebaseAuth.currentUser;

  return {
    signInWithGithub,
    addOnAuthChangeListener,
    logout,

    getUser,
  };
}

export const Auth = createAuth();
