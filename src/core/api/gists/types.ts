import type { Gists } from '@/models';
export interface FetchGistsRequestParams {
  withAuth?: boolean;
  page: number;
  itemsPerPage: number;
  public: boolean;
}

export type GetGistsApiResponse = Gists;

export type GetGenericDataResponse = unknown[];
export interface Pagination {
  totalPages?: number;
  hasMorePage: boolean;
}
export interface FetchGistsResponse extends Pagination {
  data?: Gists;
}

export type StarOperation = 'star' | 'unstar';

export interface FileToCreate {
  content: string;
}

export type FilesPayload = Record<string, FileToCreate>;
export interface CreateGistRequest {
  description: string;
  files: FilesPayload;
}
