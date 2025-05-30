import type { PaginationProps } from '@/components';
import type { Gists } from '@/models';
import type { GridProps } from '@mui/material';

export interface GistsGridProps {
  data: Gists;
  paginationProps: PaginationProps;
  gridContainerProps: GridProps;
  gridItemProps: GridProps;
}
