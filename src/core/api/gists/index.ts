import { GistsApiHandler } from '../apiHandler';
import { ApiEndpoints } from '../constants';
import { HttpMethods, type ApiResult } from '../types';
import { createApiSuccessResult } from '../utils';
import type {
  FetchGistsResponse,
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
      method: HttpMethods.Get,
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

  fetchGists: async (
    page: number,
    itemsPerPage: number
  ): Promise<ApiResult<FetchGistsResponse>> => {
    const response = await GistsApiHandler.makeApiRequest<GetGistsApiResponse>({
      endpoint: ApiEndpoints.Root,
      method: 'Get',
      withAuth: false,
      query: { page: `${page}`, per_page: `${itemsPerPage}` },
    });

    if (response.failure) {
      return response;
    }

    const pagination = parseLinkHeader(response.meta.headers.link);

    return createApiSuccessResult(
      {
        data: response.value,
        hasMorePage: pagination.hasNextPage,
        totalPages: pagination.totalPages,
      },
      response.meta
    );
  },
} as const;
