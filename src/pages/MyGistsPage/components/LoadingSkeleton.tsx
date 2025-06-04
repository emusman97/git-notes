import { Skeleton } from '@mui/material';
import type { JSX } from 'react';

export function LoadingSkeleton(): JSX.Element {
  return (
    <>
      <Skeleton variant="rounded" height="30vh" />
      <Skeleton sx={{ mt: 2 }} variant="rounded" height="30vh" />
      <Skeleton
        sx={{ mt: 1, alignSelf: 'flex-end' }}
        width="10vw"
        height="10vh"
      />
    </>
  );
}
