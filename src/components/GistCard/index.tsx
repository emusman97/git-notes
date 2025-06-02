import { useBooleanState } from '@/hooks';
import { Paper, Stack, styled } from '@mui/material';
import type { JSX } from 'react';
import { GistForkStarIconGroup } from '../GistForkStarIconGroup';
import { GistInfo } from '../GistInfo';
import { CodeBlockSnippet } from './CodeBlockSnippet';
import type { GistCardProps } from './types';

const ClickableStack = styled(Stack)(() => ({
  cursor: 'pointer',
}));

export function GistCard({ data, ...restProps }: GistCardProps): JSX.Element {
  const [hovered, hover, unHover] = useBooleanState();

  return (
    <ClickableStack
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
      >
        <Stack flex={1} flexDirection="row" alignItems="center" p={1}>
          <GistInfo data={data} />
        </Stack>

        {hovered && <GistForkStarIconGroup />}
      </Stack>
    </ClickableStack>
  );
}
