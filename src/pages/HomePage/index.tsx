import {
  Icons,
  MainLayout,
  PageHeadingContainer,
  type PaginationProps,
} from '@/components';
import { AppStrings } from '@/constants';
import { useFetchPublicGistsQuery } from '@/core';
import { useUserState } from '@/state';
import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
} from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useMemo, useState, type JSX } from 'react';
import { GistsGrid, ListSkeleton, Table } from './components';
import { NUMBER_OF_ITEMS_PER_PAGE } from './constants';
import { GistsLayouts, type GistsLayout } from './types';

export function HomePage(): JSX.Element {
  const { isAuthenticated } = useUserState();

  const [selectedLayout, setSelectedLayout] = useState<GistsLayout>(
    GistsLayouts.Table
  );
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data, isLoading, isFetching, isSuccess } = useFetchPublicGistsQuery(
    isAuthenticated ? { page, per_page: NUMBER_OF_ITEMS_PER_PAGE } : skipToken
  );

  const resetPagination = () => {
    setPage(1);
    setTotalPages(1);
  };

  const handleValueChange: ToggleButtonGroupProps['onChange'] = (
    _,
    newValue
  ) => {
    setSelectedLayout(newValue);
    resetPagination();
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
    if (isSuccess && data.hasNextPage) {
      setTotalPages(page + 1);
    }
  }, [data?.hasNextPage, isSuccess, page]);

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
    <MainLayout>
      <PageHeadingContainer
        title={AppStrings.PublicGists}
        RightComponent={renderListLayoutToggle()}
      />

      {isLoading || isAuthenticated === false ? (
        <ListSkeleton />
      ) : selectedLayout === GistsLayouts.Table ? (
        <Table data={gistsData} paginationProps={paginationProps} />
      ) : (
        <GistsGrid data={gistsData} paginationProps={paginationProps} />
      )}
    </MainLayout>
  );
}
