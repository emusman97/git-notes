import { HomePage } from '@/pages';
import type { JSX } from 'react';
import { Route, Routes } from 'react-router';

export function MainRoutes(): JSX.Element {
  return (
    <Routes>
      <Route index element={<HomePage />} />
    </Routes>
  );
}
