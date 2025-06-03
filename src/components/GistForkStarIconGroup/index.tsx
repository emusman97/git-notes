import { IconButton, Stack } from '@mui/material';
import type { JSX } from 'react';
import { Icons } from '../Icons';
import type { GistForkStarIconGroupProps } from './types';

export function GistForkStarIconGroup({
  onForkClick,
  onStartClick,
  ...restProps
}: GistForkStarIconGroupProps): JSX.Element {
  return (
    <Stack flexDirection="row" alignItems="center" {...restProps}>
      <IconButton onClick={onForkClick}>
        <Icons.GistFork sx={{ fontSize: 25 }} />
      </IconButton>
      <IconButton onClick={onStartClick}>
        <Icons.Star sx={{ fontSize: 35 }} />
      </IconButton>
    </Stack>
  );
}
