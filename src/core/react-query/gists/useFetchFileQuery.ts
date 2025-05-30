import type { GistFile } from '@/models';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BASE_QUERY_KEY = 'file';

export const FetchFileQueryKeys = {
  Base: BASE_QUERY_KEY,
  url: (file: GistFile, gistUpdatedAt: string) => [
    BASE_QUERY_KEY,
    file.raw_url,
    gistUpdatedAt,
  ],
};

export const useFetchFileQuery = (file: GistFile, gistUpdatedAt: string) =>
  useQuery<string>({
    queryKey: FetchFileQueryKeys.url(file, gistUpdatedAt),
    queryFn: () =>
      axios
        .get<string>(file.raw_url ?? '', { responseType: 'text' })
        .then((response) => response.data),
    staleTime: Infinity,
  });
