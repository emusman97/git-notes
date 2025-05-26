export interface GetGistsParams {
  per_page?: number;
  page?: number;
}

export interface ListResponse<T> {
  page: number;
  per_page: number;
  total_pages: number;
  data: T[];
}
