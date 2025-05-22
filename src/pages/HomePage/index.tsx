import { MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
import type { JSX } from 'react';

export function HomePage(): JSX.Element {
  return (
    <MainLayout>
      <PageHeadingContainer title={AppStrings.PublicGists} />
      <h1>Put table here</h1>
    </MainLayout>
  );
}
