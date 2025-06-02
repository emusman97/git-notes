import {
  GistsGrid,
  Icons,
  MainLayout,
  PageHeadingContainer,
  type PaginationProps,
} from '@/components';
import { AppStrings } from '@/constants';
import { useSearchQuery } from '@/hooks';
import { useUserState } from '@/state';
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';
import { ListSkeleton, Table } from './components';
import { GistsLayouts, type GistsLayout } from './types';
import { useGetGistsQuery } from '@/core';
import type { Gist } from '@/models';
import { useNavigate } from 'react-router';
import { RoutePaths } from '@/routes';

export function HomePage(): JSX.Element {
  const navigate = useNavigate();

  const { isAuthenticated } = useUserState();

  const { query, handleQueryValueChange } = useSearchQuery();
  const [selectedLayout, setSelectedLayout] = useState<GistsLayout>(
    GistsLayouts.Table
  );
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, isSuccess, hasNextPage, fetchNextPage } =
    useGetGistsQuery({
      public: true,
      withAuth: isAuthenticated,
    });
  const totalPages = hasNextPage
    ? (data?.pages.length ?? 0) + 1
    : (data?.pages?.length ?? 0);

  const handleValueChange: ToggleButtonGroupProps['onChange'] = (
    _,
    newValue
  ) => {
    setSelectedLayout(newValue);
  };
  const handlePreviousPage = () => setPage((page) => page - 1);
  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;

    if (nextPage === totalPages && hasNextPage) {
      fetchNextPage();
    } else {
      setPage((page) => page + 1);
    }
  }, [fetchNextPage, hasNextPage, page, totalPages]);
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
  const gistsData = useMemo(
    () => data?.pages?.[Math.max(page - 1, 0)]?.data ?? [],
    [data?.pages, page]
  );

  const renderListLayoutToggle = () => (
    <ToggleButtonGroup
      exclusive
      disabled={gistsData.length === 0}
      value={selectedLayout}
      onChange={handleValueChange}
    >
      <ToggleButton value={GistsLayouts.Grid}>
        <Icons.Grid fontSize="small" />
      </ToggleButton>
      <ToggleButton value={GistsLayouts.Table}>
        <Icons.Table fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );

  useEffect(() => {
    if (isSuccess && totalPages !== 2) {
      setPage((page) => page + 1);
    }
  }, [isSuccess, totalPages]);

  useEffect(() => {
    if (isAuthenticated) {
      setPage(1);
    }
  }, [isAuthenticated]);

  return (
    <MainLayout showSearch query={query} onQueryChange={handleQueryValueChange}>
      <PageHeadingContainer
        title={AppStrings.PublicGists}
        RightComponent={renderListLayoutToggle()}
      />

      {isLoading || gistsData.length === 0 ? (
        <ListSkeleton />
      ) : (
        gistsData.length > 0 && (
          <Stack>
            {selectedLayout === GistsLayouts.Table ? (
              <Table
                data={gistsData}
                paginationProps={paginationProps}
                onGistClick={handleGistClick}
              />
            ) : (
              <GistsGrid
                data={gistsData}
                gridContainerProps={{ spacing: { xs: 12, sm: 4 } }}
                gridItemProps={{ size: 4 }}
                gistCardProps={{ sx: { height: '100%' } }}
                paginationProps={paginationProps}
                onGistClick={handleGistClick}
              />
            )}
          </Stack>
        )
      )}
    </MainLayout>
  );
}
