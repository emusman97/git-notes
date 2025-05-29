import {
  Icons,
  MainLayout,
  PageHeadingContainer,
  type PaginationProps,
} from '@/components';
import { AppStrings } from '@/constants';
import { useGetPublicGistsQuery } from '@/core';
import { useUserState } from '@/state';
import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from '@mui/material';
import { useEffect, useMemo, useState, type JSX } from 'react';
import { GistsGrid, ListSkeleton, Table } from './components';
import { NUMBER_OF_ITEMS_PER_PAGE } from './constants';
import { GistsLayouts, type GistsLayout } from './types';
import { useSearchQuery } from '@/hooks';

export function HomePage(): JSX.Element {
  const { isAuthenticated } = useUserState();

  const { query, handleQueryValueChange } = useSearchQuery();
  const [selectedLayout, setSelectedLayout] = useState<GistsLayout>(
    GistsLayouts.Table
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isFetching, isLoading, isSuccess } = useGetPublicGistsQuery({
    runQuery: isAuthenticated,
    page,
    itemsPerPage: NUMBER_OF_ITEMS_PER_PAGE,
  });

  const handleValueChange: ToggleButtonGroupProps['onChange'] = (
    _,
    newValue
  ) => {
    setSelectedLayout(newValue);
  };
  const handlePreviousPage = () => setPage((page) => page - 1);
  const handleNextPage = () => setPage((page) => page + 1);

  const paginationProps = useMemo(
    () =>
      ({
        page,
        totalPages: totalPages,
        nextButtonLoading: page !== 1 && isFetching,
        onPreviousButtonClick: handlePreviousPage,
        onNextButtonClick: handleNextPage,
      }) satisfies PaginationProps,
    [isFetching, page, totalPages]
  );
  const gistsData = data?.data ?? [];

  useEffect(() => {
    if (isSuccess && data.hasMorePage) {
      setTotalPages(page + 1);
    }
  }, [data?.hasMorePage, isSuccess]);

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
