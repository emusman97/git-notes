import { MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
import { useGetGistsCountQuery } from '@/core';
import { Stack } from '@mui/material';
import { type JSX } from 'react';
import { MainContent, UserInfo } from './components';

export function MyGistsPage(): JSX.Element {
  const { data: totalNumberOfGists = 0 } = useGetGistsCountQuery();

  return (
    <MainLayout>
      <Stack flexDirection="row" gap={4}>
        <UserInfo />

        <Stack flex={1} justifyContent="flex-start">
          <PageHeadingContainer
            title={AppStrings.AllGists}
            showBadge
            badgeValue={totalNumberOfGists}
          />

          <Stack flex={1}>
            <MainContent />
          </Stack>
        </Stack>
      </Stack>
    </MainLayout>
  );
}
