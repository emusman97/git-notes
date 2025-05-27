import { AppStrings } from '@/constants';
import { useBooleanState } from '@/hooks';
import { theme } from '@/styles';
import { Stack, styled } from '@mui/material';
import { useMemo, type JSX } from 'react';
import type { CodeBlockSnippetProps } from './types';
import { getFilename } from '@/utils';

const ContainerStack = styled(Stack)(({ theme }) => ({
  boxSizing: 'border-box',
  '&:hover': {
    border: `1px solid ${theme.palette.primary.main}`,
  },
}));

export function CodeBlockSnippet({
  files,
}: CodeBlockSnippetProps): JSX.Element {
  const [, hover, unHover] = useBooleanState();
  const filename = useMemo(() => getFilename(files), [files]);

  return (
    <ContainerStack onMouseEnter={hover} onMouseLeave={unHover}>
      <Stack sx={{ height: 200 }}>
        <Stack
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 10,
            background: theme.palette.primary.main,
          }}
        >
          {AppStrings.View}

          {filename}
        </Stack>
      </Stack>
    </ContainerStack>
  );
}
