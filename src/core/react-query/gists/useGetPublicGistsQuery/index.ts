import { ApiService } from '@/core/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { UseGetPublicGistsQuery } from './types';

const BASE_QUERY_KEY = 'public_gists';

export const GetPublicGistsQueryKeys = {
  Base: [BASE_QUERY_KEY],
  withItemsPerPage: (itemsPerPage: number) => [
    BASE_QUERY_KEY,
    `items-${itemsPerPage}`,
  ],
} as const;

export const useGetPublicGistsQuery = ({
  runQuery = true,
  itemsPerPage,
}: UseGetPublicGistsQuery) =>
  useInfiniteQuery({
    queryKey: GetPublicGistsQueryKeys.withItemsPerPage(itemsPerPage),
    queryFn: ({ pageParam = 1 }) =>
      ApiService.Gists.fetchPublic(pageParam, itemsPerPage).then(
        ApiService.handleApiResult
      ),
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
