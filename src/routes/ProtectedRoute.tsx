import { useSelectIsAuthenticated } from '@/state';
import type { JSX, PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router';
import { RoutePaths } from './routePaths';

export function ProtectedRoute({ children }: PropsWithChildren): JSX.Element {
  const isAuthenticated = useSelectIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to={RoutePaths.Root} replace />;
  }

  return <> {children ? children : <Outlet />} </>;
}
