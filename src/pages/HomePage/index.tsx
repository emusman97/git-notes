import {
  Icons,
  MainLayout,
  PageHeadingContainer,
  type PaginationProps,
} from '@/components';
import { AppStrings } from '@/constants';
import { useGetPublicGistsQuery } from '@/core';
import { useSearchQuery } from '@/hooks';
import { useUserState } from '@/state';
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState, type JSX } from 'react';
import { GistsGrid, ListSkeleton, Table } from './components';
import { NUMBER_OF_ITEMS_PER_PAGE } from './constants';
import { GistsLayouts, type GistsLayout } from './types';

export function HomePage(): JSX.Element {
  const { isAuthenticated } = useUserState();

  const { query, handleQueryValueChange } = useSearchQuery();
  const [selectedLayout, setSelectedLayout] = useState<GistsLayout>(
    GistsLayouts.Table
  );
  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, isSuccess, hasNextPage, fetchNextPage } =
    useGetPublicGistsQuery({
      runQuery: isAuthenticated,
      page,
      itemsPerPage: NUMBER_OF_ITEMS_PER_PAGE,
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
      disabled={isAuthenticated === false}
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

  return (
    <MainLayout showSearch query={query} onQueryChange={handleQueryValueChange}>
      <PageHeadingContainer
        title={AppStrings.PublicGists}
        RightComponent={renderListLayoutToggle()}
      />

      {isLoading || isAuthenticated === false ? (
        <ListSkeleton />
      ) : (
        <Stack>
          {selectedLayout === GistsLayouts.Table ? (
            <Table data={gistsData} paginationProps={paginationProps} />
          ) : (
            <GistsGrid data={gistsData} paginationProps={paginationProps} />
          )}
        </Stack>
      )}
    </MainLayout>
  );
}
