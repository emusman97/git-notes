import { GistsApiHandler } from '../apiHandler';
import { ApiEndpoints } from '../constants';
import type { ApiResult } from '../types';
import { createApiSuccessResult } from '../utils';
import type {
  FetchPublicGistsRequestParams,
  FetchPublicGistsResponse,
  GetGistsApiResponse,
} from './types';
import { parseLinkHeader } from './utils';

export const Gists = {
  fetchPublic: async ({
    withAuth,
    page,
    itemsPerPage,
  }: FetchPublicGistsRequestParams): Promise<
    ApiResult<FetchPublicGistsResponse>
  > => {
    const response = await GistsApiHandler.makeApiRequest<GetGistsApiResponse>({
      endpoint: ApiEndpoints.Public,
      method: 'Get',
      withAuth,
      query: {
        page: `${page}`,
        per_page: `${itemsPerPage}`,
      },
    });

    if (response.failure) {
      return response;
    }

    const { hasNextPage } = parseLinkHeader(response.meta.headers.link);

    return createApiSuccessResult(
      {
        data: response.value,
        hasMorePage: hasNextPage,
      },
      response.meta
    );
  },
} as const;
