import type { Gist, GistId } from '@/models';
import { GistsApiHandler } from '../apiHandler';
import { ApiEndpoints } from '../constants';
import { HttpMethods, type ApiResult } from '../types';
import { createApiSuccessResult } from '../utils';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PUBLIC_ITEMS_PER_PAGE,
} from './constants';
import type {
  CreateGistRequest,
  FetchGistsRequestParams,
  FetchGistsResponse,
  GetGistsApiResponse,
  StarOperation,
} from './types';
import { parseLinkHeader } from './utils';
import type { AxiosResponse } from 'axios';

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

  fetchGistForksCount: async (gistId: GistId) => {
    let count = 0;
    let hasMorePages = true;
    let lastRes: AxiosResponse;

    while (hasMorePages) {
      const response =
        await GistsApiHandler.makeApiRequest<GetGistsApiResponse>({
          endpoint: ApiEndpoints.Forks(gistId),
          method: HttpMethods.Get,
          withAuth: true,
        });

      if (response.failure) {
        return response;
      }

      lastRes = response.meta;

      count += response.value?.length ?? 0;

      const { hasMorePage } = parseLinkHeader(response.meta.headers.link);

      console.log({ hasMorePage });

      hasMorePages = hasMorePage;
    }

    return createApiSuccessResult(count, lastRes!);
  },
  fork: (id: GistId) =>
    GistsApiHandler.makeApiRequest<Gist>({
      endpoint: ApiEndpoints.Forks(id),
      method: HttpMethods.Post,
      withAuth: true,
    }),

  create: (gist: CreateGistRequest) =>
    GistsApiHandler.makeApiRequest<Gist, CreateGistRequest>({
      endpoint: ApiEndpoints.Root,
      method: HttpMethods.Post,
      withAuth: true,
      data: gist,
    }),
} as const;
