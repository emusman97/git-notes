import { ApiService } from '@/core/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { UseGetPublicGistsQuery } from './types';

const BASE_QUERY_KEY = 'public_gists';

export const GetPublicGistsQueryKeys = {
  Base: [BASE_QUERY_KEY],
  withItemsPerPage: (itemsPerPage: number, withAuth: boolean) => [
    BASE_QUERY_KEY,
    `items-${itemsPerPage}`,
    withAuth,
  ],
} as const;

export const useGetPublicGistsQuery = ({
  runQuery = true,
  itemsPerPage,
  withAuth,
}: UseGetPublicGistsQuery) =>
  useInfiniteQuery({
    queryKey: GetPublicGistsQueryKeys.withItemsPerPage(itemsPerPage, withAuth),
    queryFn: ({ pageParam = 1 }) =>
      ApiService.Gists.fetchPublic({
        page: pageParam,
        itemsPerPage,
        withAuth,
      }).then(ApiService.handleApiResult),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMorePage) {
        return allPages.length + 1;
      }

      return null;
    },
    initialPageParam: 1,
    staleTime: 0,
    enabled: runQuery,
  });
