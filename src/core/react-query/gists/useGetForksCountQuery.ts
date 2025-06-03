import { ApiService } from '@/core/api';
import type { GistId } from '@/models';
import { useQuery } from '@tanstack/react-query';

const BASE_QUERY_KEY = 'forks';

export const GetForksCountQueryKeys = {
  Base: BASE_QUERY_KEY,
  withId: (id: GistId) => [BASE_QUERY_KEY, id],
};

export const useGetForksCountQuery = (id: GistId) =>
  useQuery({
    queryKey: GetForksCountQueryKeys.withId(id),
    queryFn: () =>
      ApiService.Gists.fetchGistForksCount(id).then(ApiService.handleApiResult),
    staleTime: 0,
  });
