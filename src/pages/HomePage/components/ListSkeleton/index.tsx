import { Skeleton, Stack } from '@mui/material';
import type { JSX } from 'react';

export function ListSkeleton(): JSX.Element {
  return (
    <Stack gap={2}>
      <Skeleton variant="rounded" height={'8vh'} width="auto" />
      <Skeleton variant="rounded" height={'8vh'} width="auto" />
      <Skeleton variant="rounded" height={'8vh'} width="auto" />
      <Skeleton variant="rounded" height={'8vh'} width="auto" />
      <Skeleton variant="rounded" height={'8vh'} width="auto" />
      <Skeleton variant="rounded" height={'8vh'} width="auto" />
    </Stack>
  );
}
