import { ApiService } from '@/core/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { UseGetGistsQuery } from './types';

const BASE_QUERY_KEY = 'gists';

export const GetGistsQueryKeys = {
  Base: [BASE_QUERY_KEY],
  public: (withAuth: boolean) => [BASE_QUERY_KEY, 'public', withAuth],
  own: () => [BASE_QUERY_KEY, 'own'],
} as const;

export const useGetGistsQuery = (params: UseGetGistsQuery) =>
  useInfiniteQuery({
    queryKey: params.public
      ? GetGistsQueryKeys.public(params.withAuth)
      : GetGistsQueryKeys.own(),
    queryFn: ({ pageParam }) =>
      (params.public
        ? ApiService.Gists.fetchPublicGists(pageParam, params.withAuth)
        : ApiService.Gists.fetchGists(pageParam)
      ).then(ApiService.handleApiResult),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.hasMorePage) {
        return allPages.length + 1;
      }

      return null;
    },
    initialPageParam: 1,
    staleTime: 0,
  });
