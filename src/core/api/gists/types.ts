import type { Gists } from '@/models';

export interface FetchPublicGistsRequestParams {
  withAuth: boolean;
  page: number;
  itemsPerPage: number;
}

export type GetGistsApiResponse = Gists;
export interface FetchPublicGistsResponse {
  data?: Gists;
  hasMorePage: boolean;
}
