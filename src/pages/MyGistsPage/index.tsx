import { MainLayout } from '@/components';
import { type JSX } from 'react';

export function MyGistsPage(): JSX.Element {
  return (
    <MainLayout showSearch>
      <h1>My gists</h1>
    </MainLayout>
  );
}
