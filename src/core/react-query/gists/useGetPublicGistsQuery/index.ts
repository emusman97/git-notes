import { useQuery } from '@tanstack/react-query';

import {
  ApiService,
  type ApiFailureResult,
  type FetchPublicGistsResponse,
} from '@/core/api';
import type { QueryKey } from '@tanstack/react-query';
import type { UseGetPublicGistsQuery } from './types';

const BASE_QUERY_KEY = 'public_gists';

export const GetPublicGistsQueryKeys = {
  Base: [BASE_QUERY_KEY],
  paginated: (page: number, itemsPerPage: number): QueryKey => [
    BASE_QUERY_KEY,
    `page=${page}`,
    `per_page=${itemsPerPage}`,
  ],
} as const;

export const useGetPublicGistsQuery = ({
  runQuery = true,
  page,
  itemsPerPage,
}: UseGetPublicGistsQuery) =>
  useQuery<FetchPublicGistsResponse, ApiFailureResult>({
    queryKey: GetPublicGistsQueryKeys.paginated(page, itemsPerPage),
    queryFn: () =>
      ApiService.Gists.fetchPublic(page, itemsPerPage).then(
        ApiService.handleApiResult
      ),
    staleTime: 0,
    enabled: runQuery,
  });
