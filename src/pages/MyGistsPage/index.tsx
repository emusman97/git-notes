import { GistsGrid, MainLayout, PageHeadingContainer } from '@/components';
import { AppStrings } from '@/constants';
import { useGists } from '@/hooks';
import type { Gist } from '@/models';
import { RoutePaths, type ViewGistsState } from '@/routes';
import { Skeleton, Stack, Typography } from '@mui/material';
import { type JSX } from 'react';
import { useNavigate } from 'react-router';
import { UserInfo } from './components';

export function MyGistsPage(): JSX.Element {
  const navigate = useNavigate();

  const {
    isLoading,
    isFetching,
    noData,
    gistsData,
    totalNumberOfGists,
    paginationProps,
  } = useGists({});

  const handleGistClick = (gist: Gist) => {
    const state: ViewGistsState = { data: gist, myGist: true };
    navigate(RoutePaths.Gist, { state });
  };

  const renderLoadingSkeleton = () => {
    return (
      <>
        <Skeleton variant="rounded" height="30vh" />
        <Skeleton sx={{ mt: 2 }} variant="rounded" height="30vh" />
        <Skeleton
          sx={{ mt: 1, alignSelf: 'flex-end' }}
          width="10vw"
          height="10vh"
        />
      </>
    );
  };
  const renderContent = () => {
    if (noData) {
      return (
        <Typography variant="h3">{AppStrings.NoGistsAvailable}</Typography>
      );
    } else if (isLoading || isFetching) {
      return renderLoadingSkeleton();
    } else {
      return (
        <GistsGrid
          gridContainerProps={{ spacing: 2 }}
          gridItemProps={{ size: 12 }}
          gistCardProps={{ sx: { height: '100%' } }}
          data={gistsData}
          paginationProps={paginationProps}
          onGistClick={handleGistClick}
        />
      );
    }
  };

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

          <Stack flex={1}>{renderContent()}</Stack>
        </Stack>
      </Stack>
    </MainLayout>
  );
}
