import { AppStrings } from '@/constants';
import { useBooleanState } from '@/hooks';
import { theme } from '@/styles';
import { Stack, styled, Typography } from '@mui/material';
import { useMemo, type JSX } from 'react';
import type { CodeBlockSnippetProps } from './types';
import { getFilename } from '@/utils';

const ContainerStack = styled(Stack)(({ theme }) => ({
  position: 'relative',
  color: theme.palette.secondary.main,
  '&:hover': {
    border: `1px solid ${theme.palette.primary.main}`,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
}));

export function CodeBlockSnippet({
  files,
}: CodeBlockSnippetProps): JSX.Element {
  const [hovered, hover, unHover] = useBooleanState();
  const filename = useMemo(() => getFilename(files), [files]);

  return (
    <ContainerStack onMouseEnter={hover} onMouseLeave={unHover}>
      <Stack sx={{ height: 200 }}></Stack>
      {hovered && (
        <Stack
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            zIndex: 10,
            background: theme.palette.primary.main,
            p: 1,
            maxWidth: '80%',
            maxHeight: '40%',
          }}
        >
          <Typography fontSize={11}>
            {AppStrings.View}{' '}
            <Typography fontSize={11} fontWeight={700} component="span">
              {filename}
            </Typography>
          </Typography>
        </Stack>
      )}
    </ContainerStack>
  );
}
