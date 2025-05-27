import type { Callback } from '@/types';
import type { StackProps } from '@mui/material';

export interface PaginationProps extends StackProps {
  totalPages: number;
  page: number;
  prevButtonLoading?: boolean;
  nextButtonLoading?: boolean;
  onPreviousButtonClick?: Callback;
  onNextButtonClick?: Callback;
}
