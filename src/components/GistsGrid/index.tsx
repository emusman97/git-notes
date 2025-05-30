import type { JSX } from 'react';
import type { GistsGridProps } from './types';
import { Grid, Stack } from '@mui/material';
import { GistCard, Pagination } from '@/components';

export function GistsGrid({
  data,
  paginationProps,
  gridContainerProps,
}: GistsGridProps): JSX.Element {
  return (
    <Stack gap={2}>
      <Grid container {...gridContainerProps}>
        {data.map((item) => (
          <Grid key={item.id} size={4}>
            <GistCard sx={{ height: '100%' }} data={item} />
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="flex-end">
        <Pagination {...paginationProps} />
      </Stack>
    </Stack>
  );
}
