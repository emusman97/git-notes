import type { Callback } from '@/types';
import type { StackProps } from '@mui/material/Stack';

export interface GistForkStarIconGroupProps extends StackProps {
  onForkClick?: Callback;
  onStartClick?: Callback;
}
