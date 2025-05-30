import type { Gist } from '@/models';
import type { StackProps } from '@mui/material';

export interface GistInfoProps extends StackProps {
  data: Gist;
}
