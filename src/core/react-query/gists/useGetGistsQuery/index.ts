import { ApiService } from '@/core/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const BASE_QUERY_KEY = 'gists';

export const GetGistsQueryKeys = {
  Base: [BASE_QUERY_KEY],
  withItemsPerPage: (itemsPerPage: number) => [BASE_QUERY_KEY, itemsPerPage],
} as const;

export const useGetGistsQuery = (itemsPerPage: number) =>
  useInfiniteQuery({
    queryKey: GetGistsQueryKeys.withItemsPerPage(itemsPerPage),
    queryFn: ({ pageParam }) =>
      ApiService.Gists.fetchGists(pageParam, itemsPerPage).then(
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
  });
