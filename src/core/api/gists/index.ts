import { GistsApiHandler } from '../apiHandler';
import { ApiEndpoints } from '../constants';
import { HttpMethods, type ApiResult } from '../types';
import { createApiSuccessResult } from '../utils';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PUBLIC_ITEMS_PER_PAGE,
} from './constants';
import type {
  FetchGistsRequestParams,
  FetchGistsResponse,
  GetGistsApiResponse,
} from './types';
import { parseLinkHeader } from './utils';

const fetchGists = async ({
  page,
  itemsPerPage,
  withAuth,
  ...restParams
}: FetchGistsRequestParams): Promise<ApiResult<FetchGistsResponse>> => {
  const response = await GistsApiHandler.makeApiRequest<GetGistsApiResponse>({
    endpoint: restParams['public'] ? ApiEndpoints.Public : ApiEndpoints.Root,
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

  const pagination = parseLinkHeader(response.meta.headers.link);

  return createApiSuccessResult(
    {
      data: response.value,
      ...pagination,
    },
    response.meta
  );
};

export const Gists = {
  fetchGists: (page: number) =>
    fetchGists({
      page,
      withAuth: true,
      public: false,
      itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
    }),
  fetchPublicGists: (page: number, withAuth: boolean) =>
    fetchGists({
      page,
      withAuth,
      public: true,
      itemsPerPage: DEFAULT_PUBLIC_ITEMS_PER_PAGE,
    }),
} as const;
