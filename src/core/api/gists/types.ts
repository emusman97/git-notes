import type { Gists } from '@/models';
export interface FetchGistsRequestParams {
  withAuth: boolean;
  page: number;
  itemsPerPage: number;
  public: boolean;
}

export type GetGistsApiResponse = Gists;

export interface Pagination {
  totalPages?: number;
  hasMorePage: boolean;
}
export interface FetchGistsResponse extends Pagination {
  data?: Gists;
}

export type StarOperation = 'star' | 'unstar';
