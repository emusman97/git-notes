import type { PaginationProps } from '@/components';
import type { Gists } from '@/models';

export interface GistsGridProps {
  data: Gists;
  paginationProps: PaginationProps;
}
