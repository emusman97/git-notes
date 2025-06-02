import { MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
import type { JSX } from 'react';

export function CreateGistPage(): JSX.Element {
  return (
    <MainLayout>
      <PageHeadingContainer title={AppStrings.CreateGist} />
    </MainLayout>
  );
}
