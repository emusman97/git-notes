import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import type { JSX } from 'react';
import type { PageHeadingContainerProps } from './types';

export function PageHeadingContainer({
  title,
  RightComponent,
  ...restProps
}: PageHeadingContainerProps): JSX.Element {
  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      mb={2}
      {...restProps}
    >
      <Typography variant="h2" fontSize={25}>
        {title}
      </Typography>

      {RightComponent}
    </Stack>
  );
}
