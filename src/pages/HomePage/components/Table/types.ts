import type { PaginationProps } from '@/components';
import type { Gist, Gists } from '@/models';
import type { StackProps } from '@mui/material';

export interface TableProps extends StackProps {
  data: Gists;
  paginationProps: PaginationProps;
  onGistClick?: (gist: Gist) => void;
}
