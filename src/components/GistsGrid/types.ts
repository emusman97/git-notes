import type { PaginationProps } from '@/components';
import type { Gist, Gists } from '@/models';
import type { GridProps } from '@mui/material';
import type { GistCardProps } from '../GistCard/types';

export interface GistsGridProps {
  data: Gists;
  paginationProps: PaginationProps;
  gridContainerProps: GridProps;
  gridItemProps: GridProps;
  gistCardProps: Omit<GistCardProps, 'data'>;
  onGistClick?: (gist: Gist) => void;
}
