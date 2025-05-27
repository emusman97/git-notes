export interface GetGistsParams {
  per_page?: number;
  page?: number;
}

export interface ListResponse<T> {
  page: number;
  perPage: number;
  totalPages: number;
  hasNextPage: boolean;
  data: T[];
}
