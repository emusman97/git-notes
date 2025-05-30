import { HomePage, MyGistsPage } from '@/pages';
import type { JSX } from 'react';
import { Route, Routes } from 'react-router';
import { RoutePaths } from './routePaths';
import { ProtectedRoute } from './ProtectedRoute';

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route
        path={RoutePaths.MyGists}
        element={
          <ProtectedRoute>
            <MyGistsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
