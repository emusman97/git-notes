import type { GistId } from '@/models';
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
  StarOperation,
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

const starUnStarGist = (gistId: GistId, starOp: StarOperation) =>
  GistsApiHandler.makeApiRequest({
    endpoint: ApiEndpoints.Star(gistId),
    method: starOp === 'star' ? HttpMethods.Put : HttpMethods.Delete,
    withAuth: true,
  });

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

  checkIsStarred: async (gistId: GistId) => {
    const response = await GistsApiHandler.makeApiRequest({
      endpoint: ApiEndpoints.Star(gistId),
      method: HttpMethods.Get,
      withAuth: true,
    });

    return response.code === 204;
  },
  star: (gistId: GistId) => starUnStarGist(gistId, 'star'),
  unStar: (gistId: GistId) => starUnStarGist(gistId, 'unstar'),
} as const;
