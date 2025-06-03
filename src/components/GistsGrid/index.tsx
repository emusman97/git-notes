import type { JSX } from 'react';
import type { GistsGridProps } from './types';
import { Grid, Stack } from '@mui/material';
import { GistCard, Pagination } from '@/components';
import { makeItemKey } from '@/utils';
import type { Gist } from '@/models';

export function GistsGrid({
  data,
  paginationProps,
  gridContainerProps,
  gridItemProps,
  gistCardProps,
  onGistClick,
}: GistsGridProps): JSX.Element {
  const handleGistClick = (gist: Gist) => () => {
    onGistClick?.(gist);
  };

  return (
    <Stack gap={2}>
      <Grid container {...gridContainerProps}>
        {data.map((item, index) => (
          <Grid key={makeItemKey(item.id ?? '', index)} {...gridItemProps}>
            <GistCard
              onClick={handleGistClick(item)}
              {...gistCardProps}
              data={item}
            />
          </Grid>
        ))}
      </Grid>

      <Stack alignItems="flex-end">
        <Pagination {...paginationProps} />
      </Stack>
    </Stack>
  );
}
