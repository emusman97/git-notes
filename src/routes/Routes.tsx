import { CreateGistPage, HomePage, MyGistsPage, ViewGistPage } from '@/pages';
import type { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { RoutePaths } from './routePaths';
import { ProtectedRoute } from './ProtectedRoute';

export function MainRoutes(): JSX.Element {
  return (
    <BrowserRouter>
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
        <Route path={RoutePaths.Gist} element={<ViewGistPage />} />
        <Route
          path={RoutePaths.CreateGist}
          element={
            <ProtectedRoute>
              <CreateGistPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
