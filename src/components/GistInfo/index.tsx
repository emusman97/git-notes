import { useMemo, type JSX } from 'react';
import type { GistInfoProps } from './types';
import Typography from '@mui/material/Typography';
import { AppStrings } from '@/constants';
import Stack from '@mui/material/Stack';
import { getFilename, getInitials, timeAgo } from '@/utils';
import { Avatar, styled } from '@mui/material';

const OverflowAwareTypography = styled(Typography)(() => ({
  overflow: 'hidden',
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
}));

export function GistInfo({ data, ...restProps }: GistInfoProps): JSX.Element {
  const user = data.user ?? data.owner ?? {};

  const filename = useMemo(() => getFilename(data.files ?? {}), [data.files]);

  return (
    <Stack gap={1} flexDirection="row" {...restProps}>
      <Avatar src={user.avatar_url}>{getInitials(user.login ?? '')}</Avatar>

      <Stack gap={0.5}>
        <OverflowAwareTypography>
          {user.login ?? AppStrings.JohnDoe} /{' '}
          <Typography component="span" fontWeight={600}>
            {filename}
          </Typography>
        </OverflowAwareTypography>

        <Stack>
          <Typography color="textSecondary" fontSize={11}>
            {AppStrings.Created} {timeAgo(data.created_at ?? '')}
          </Typography>
          <OverflowAwareTypography color="textSecondary" fontSize={11}>
            {data.description}
          </OverflowAwareTypography>
        </Stack>
      </Stack>
    </Stack>
  );
}
