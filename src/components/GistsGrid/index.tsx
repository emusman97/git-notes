import type { JSX } from 'react';
import type { GistsGridProps } from './types';
import { Grid, Stack } from '@mui/material';
import { GistCard, Pagination } from '@/components';
import { makeItemKey } from '@/utils';

export function GistsGrid({
  data,
  paginationProps,
  gridContainerProps,
  gridItemProps,
  gistCardProps,
}: GistsGridProps): JSX.Element {
  return (
    <Stack gap={2}>
      <Grid container {...gridContainerProps}>
        {data.map((item, index) => (
          <Grid key={makeItemKey(item.id ?? '', index)} {...gridItemProps}>
            <GistCard {...gistCardProps} data={item} />
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="flex-end">
        <Pagination {...paginationProps} />
      </Stack>
    </Stack>
  );
}
