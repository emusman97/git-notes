import type { FailureResult, SuccessResult } from '@/types';
import type { AuthError as FirebaseAuthError, User } from 'firebase/auth';

export type FirebaseUser = User;

export type AuthErrorCode = string;
export type AuthError = FirebaseAuthError | Error | null;

export interface SuccessData {
  accessToken?: string;
  user: FirebaseUser;
}

export type SignInWithGithubSuccessResult<D> = Omit<
  SuccessResult<D, undefined>,
  'code'
>;

export type SignInWithGithubFailureResult = FailureResult<
  AuthErrorCode,
  AuthError
>;

export type SignInWithGithubResult =
  | SignInWithGithubSuccessResult<SuccessData>
  | SignInWithGithubFailureResult;

export type OnAuthStateChangedListener = (user: FirebaseUser | null) => void;
