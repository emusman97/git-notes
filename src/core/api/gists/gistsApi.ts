import { LocalStorageService } from '@/core';
import type { Gist, Gists } from '@/models';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  apiEndpoints,
  AUTH_HEADER_KEY,
  BASE_URL,
  baseHeaders,
  DEFAULT_GISTS_PER_PAGE,
  getAuthHeaderValue,
  LINK_HEADER_KEY,
  REDUCER_PATH,
  TagTypes,
} from './constants';
import type { GetGistsParams, ListResponse } from './types';
import { parseLinkHeader } from './utils';

export const gistsApi = createApi({
  reducerPath: REDUCER_PATH,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      baseHeaders.forEach((header) => headers.set(header.key, header.value));

      const token = LocalStorageService.getString('GithubToken');

      if (token) {
        headers.set(AUTH_HEADER_KEY, getAuthHeaderValue(token));
      }

      return headers;
    },
  }),
  tagTypes: [TagTypes.PublicGists, TagTypes.Gist],
  endpoints(builder) {
    return {
      fetchPublicGists: builder.query<ListResponse<Gist>, GetGistsParams>({
        query: ({ per_page = DEFAULT_GISTS_PER_PAGE, page = 1 }) => ({
          url: apiEndpoints.public,
          params: {
            per_page,
            page,
          },
        }),
        transformResponse(response, meta, params) {
          const linkHeader = meta?.response?.headers?.get(LINK_HEADER_KEY);
          const pagination = parseLinkHeader(linkHeader ?? '');

          return {
            data: response as Gists,
            page: params.page ?? 1,
            perPage: params.per_page ?? DEFAULT_GISTS_PER_PAGE,
            totalPages: pagination.totalPages,
            hasNextPage: pagination.hasNextPage,
          };
        },
        providesTags: ['PublicGists'],
      }),
    };
  },
});

export { TagTypes } from './constants';
