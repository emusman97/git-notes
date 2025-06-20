import { AppStrings } from '@/constants';
import { useFetchFileQuery } from '@/core';
import { theme } from '@/styles';
import { Box, Stack, styled, Typography } from '@mui/material';
import { useMemo, type JSX } from 'react';
import { CodeBlock } from '../CodeBlock';
import type { CodeBlockSnippetProps } from './types';

const ContainerStack = styled(Stack)(({ theme }) => ({
  width: '100%',
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
  gistUpdatedAt,
  hovered,
  ...restProps
}: CodeBlockSnippetProps): JSX.Element {
  const file = useMemo(() => Object.values(files)?.[0], [files]);

  const { data } = useFetchFileQuery(file, gistUpdatedAt);

  return (
    <ContainerStack {...restProps}>
      <Box sx={{ height: 200, width: '100%', overflow: 'auto' }}>
        <CodeBlock
          code={data ?? ''}
          language={file.language ?? ''}
          preElStyles={{
            overflow: 'hidden',
          }}
          numberOfLinesToRender={14}
        />
      </Box>
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
              {file.filename}
            </Typography>
          </Typography>
        </Stack>
      )}
    </ContainerStack>
  );
}
