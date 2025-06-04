import { MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
import type { JSX } from 'react';
import { CreateGistForm } from './components';

export function CreateGistPage(): JSX.Element {
  return (
    <MainLayout>
      <PageHeadingContainer title={AppStrings.CreateGist} />

      <CreateGistForm />
    </MainLayout>
  );
}
