import { GistsApiHandler } from '../apiHandler';
import { ApiEndpoints } from '../constants';
import type { ApiResult } from '../types';
import { createApiSuccessResult } from '../utils';
import type { FetchPublicGistsResponse, GetGistsApiResponse } from './types';
import { parseLinkHeader } from './utils';

export const Gists = {
  fetchPublic: async (
    page: number,
    itemsPerPage: number
  ): Promise<ApiResult<FetchPublicGistsResponse>> => {
    const response = await GistsApiHandler.makeApiRequest<GetGistsApiResponse>({
      endpoint: ApiEndpoints.Public,
      method: 'Get',
      withAuth: true,
      query: {
        page: `${page}`,
        per_page: `${itemsPerPage}`,
      },
    });

    if (response.failure) {
      return response;
    }

    const { hasNextPage } = parseLinkHeader(response.meta.headers.Link);

    return createApiSuccessResult(
      {
        data: response.value,
        hasMorePage: hasNextPage,
      },
      response.meta
    );
  },
} as const;
