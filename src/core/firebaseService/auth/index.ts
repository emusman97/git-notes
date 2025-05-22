import { isError } from '@/utils';
import {
  GithubAuthProvider,
  signInWithPopup,
  type AuthError,
} from 'firebase/auth';
import { firebaseAuth } from '../common';
import {
  githubOAuthScopes,
  UNKNOWN_ERROR_CODE,
  UNKNOWN_ERROR_MESSAGE,
} from '../constants';
import type {
  SignInWithGithubFailureResult,
  SignInWithGithubResult,
} from './types';

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
        value: { accessToken },
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

  return {
    signInWithGithub,
  };
}

export const Auth = createAuth();
