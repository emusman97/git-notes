import type { PaginationProps } from '@/components';
import { useGetGistsQuery } from '@/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { UseGetGists } from './types';
import { useSelectIsAuthenticated } from '@/state';

export function useGists({ public: isPublic = false }: UseGetGists) {
  const isAuthenticated = useSelectIsAuthenticated();

  const [page, setPage] = useState(1);
  const { data, isFetching, isLoading, isSuccess, hasNextPage, fetchNextPage } =
    useGetGistsQuery({
      public: isPublic,
      withAuth: isAuthenticated,
    });

  const totalPages = hasNextPage
    ? (data?.pages.length ?? 0) + 1
    : (data?.pages?.length ?? 0);

  const handlePreviousPage = () => setPage((page) => page - 1);
  const handleNextPage = useCallback(() => {
    const nextPage = page + 1;

    if (nextPage > (data?.pages?.length ?? 0) && hasNextPage) {
      fetchNextPage();
    }

    setPage(nextPage);
  }, [data?.pages?.length, fetchNextPage, hasNextPage, page]);

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
  const totalNumberOfGists = useMemo(
    () =>
      data?.pages?.reduce(
        (acc, currData) => acc + (currData.data?.length ?? 0),
        0
      ) ?? 0,
    [data?.pages]
  );
  const noData = useMemo(
    () => isSuccess && totalNumberOfGists === 0,
    [isSuccess, totalNumberOfGists]
  );

  useEffect(() => {
    if (isAuthenticated) {
      setPage(1);
    }
  }, [isAuthenticated]);

  return {
    isLoading,
    isFetching,
    isSuccess,
    noData,
    gistsData,
    totalPages,
    totalNumberOfGists,
    paginationProps,
  } as const;
}
