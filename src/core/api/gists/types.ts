import type { Gists } from '@/models';

export type GetGistsApiResponse = Gists;
export interface FetchPublicGistsResponse {
  data?: Gists;
  hasMorePage: boolean;
}
