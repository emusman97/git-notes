import { useBooleanState } from '@/hooks';
import type { GistUser } from '@/models';
import { getInitials } from '@/utils';
import { Avatar, Paper, Stack } from '@mui/material';
import type { JSX } from 'react';
import { GistInfo } from '../GistInfo';
import { CodeBlockSnippet } from './CodeBlockSnippet';
import type { GistCardProps } from './types';
import { GistForkStarIconGroup } from '../GistForkStarIconGroup';

export function GistCard({ data, ...restProps }: GistCardProps): JSX.Element {
  const [hovered, hover, unHover] = useBooleanState();

  const user = (data.user ?? data.owner ?? {}) satisfies GistUser;

  return (
    <Stack
      component={Paper}
      {...restProps}
      onMouseEnter={hover}
      onMouseLeave={unHover}
    >
      <CodeBlockSnippet
        hovered={hovered}
        files={data.files ?? {}}
        gistUpdatedAt={data.updated_at ?? ''}
      />

      <Stack
        flex={1}
        flexDirection="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
        // sx={{ flexWrap: 'wrap' }}
      >
        <Stack flex={1} flexDirection="row" alignItems="center" p={1} gap={1}>
          <Avatar src={user.avatar_url}>{getInitials(user.login ?? '')}</Avatar>

          <GistInfo data={data} />
        </Stack>

        {hovered && <GistForkStarIconGroup />}
      </Stack>
    </Stack>
  );
}
