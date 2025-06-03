import { ApiService } from '@/core/api';
import { useQuery } from '@tanstack/react-query';

const BASE_QUERY_KEY = 'gists_count';

export const GetGistsCountQueryKeys = {
  Base: [BASE_QUERY_KEY],
};

export const useGetGistsCountQuery = () =>
  useQuery({
    queryKey: GetGistsCountQueryKeys.Base,
    queryFn: () =>
      ApiService.Gists.fetchAllGistsCount().then(ApiService.handleApiResult),
    staleTime: 0,
  });
