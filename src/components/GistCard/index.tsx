import type { GistUser } from '@/models';
import { getInitials } from '@/utils';
import { Avatar, Paper, Stack } from '@mui/material';
import type { JSX } from 'react';
import { GistInfo } from '../GistInfo';
import type { GistCardProps } from './types';
import { CodeBlockSnippet } from './CodeBlockSnippet';

export function GistCard({
  data,
  sx,
  ...restProps
}: GistCardProps): JSX.Element {
  const user = (data.user ?? data.owner ?? {}) satisfies GistUser;

  return (
    <Paper
      {...restProps}
      sx={{ display: 'flex', flexDirection: 'column', ...sx }}
    >
      <CodeBlockSnippet files={data.files ?? {}} />
      <Stack flex={1} flexDirection="row" alignItems="center" p={1} gap={1}>
        <Avatar src={user.avatar_url}>{getInitials(user.login ?? '')}</Avatar>

        <GistInfo data={data} />
      </Stack>
    </Paper>
  );
}
