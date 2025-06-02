import {
  GistsGrid,
  MainLayout,
  PageHeadingContainer,
  type PaginationProps,
} from '@/components';
import { Skeleton, Stack, Typography } from '@mui/material';
import { useCallback, useMemo, useState, type JSX } from 'react';
import { UserInfo } from './components';
import { AppStrings } from '@/constants';
import { useGetGistsQuery } from '@/core';
import type { Gist } from '@/models';
import { useNavigate } from 'react-router';
import { RoutePaths } from '@/routes';

export function MyGistsPage(): JSX.Element {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, isSuccess, hasNextPage, fetchNextPage } =
    useGetGistsQuery({ public: false });

  const totalPages = useMemo(
    () => data?.pages?.length ?? 0,
    [data?.pages?.length]
  );
  const totalNumberOfGists = useMemo(
    () =>
      data?.pages?.reduce(
        (acc, currData) => acc + (currData.data?.length ?? 0),
        0
      ) ?? 0,
    [data?.pages]
  );
  const gistsData = useMemo(
    () => data?.pages?.[Math.max(page - 1, 0)]?.data ?? [],
    [data?.pages, page]
  );
  const noData = useMemo(
    () => isSuccess && totalNumberOfGists === 0,
    [isSuccess, totalNumberOfGists]
  );

  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;

    if (nextPage === totalPages && hasNextPage) {
      fetchNextPage();
    } else {
      setPage((page) => page + 1);
    }
  }, [fetchNextPage, hasNextPage, page, totalPages]);
  const handlePreviousPage = () => {
    setPage((page) => Math.max(page - 0, 1));
  };
  const handleGistClick = (gist: Gist) => {
    navigate(RoutePaths.Gist, { state: gist });
  };

  const paginationProps = useMemo(
    () =>
      ({
        page,
        totalPages: totalPages,
        nextButtonLoading: page !== 1 && isFetching,
        onPreviousButtonClick: handlePreviousPage,
        onNextButtonClick: handleNextPage,
      }) satisfies PaginationProps,
    [handleNextPage, isFetching, page, totalPages]
  );

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
