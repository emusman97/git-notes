import { ApiService } from '@/core/api';
import type { GistId } from '@/models';
import { useQuery } from '@tanstack/react-query';

const BASE_QUERY_KEY = 'file';

export const IsStarredQueryKeys = {
  Base: BASE_QUERY_KEY,
  withId: (id: GistId) => [BASE_QUERY_KEY, id],
};

export const useIsStarredQuery = (id: GistId) =>
  useQuery({
    queryKey: IsStarredQueryKeys.withId(id),
    queryFn: () => ApiService.Gists.checkIsStarred(id),
    staleTime: 0,
  });
