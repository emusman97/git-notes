import { CodeBlock, Icons } from '@/components';
import { getPrismLanguageFromMimeType } from '@/utils';
import {
  Box,
  FormHelperText,
  IconButton,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useEffect, type JSX } from 'react';
import type { FileProps } from './types';

export function File({
  data,
  fieldError,
  onDeleteClick,
  onContentLoad,
}: FileProps): JSX.Element {
  const theme = useTheme();

  const content = data.content;

  const renderContent = () =>
    content === null ? (
      <Skeleton variant="rectangular" height="100%" width="100%" />
    ) : (
      <CodeBlock
        code={content}
        language={getPrismLanguageFromMimeType(data.file.type)}
        preElStyles={{
          overflow: 'hidden',
        }}
        numberOfLinesToRender={20}
      />
    );

  useEffect(() => {
    data.file.text().then((text) => {
      onContentLoad(text);
    });
  }, []);

  return (
    <>
      <Stack mt={2} component={Paper}>
        <Stack
          flexDirection="row"
          sx={{ background: grey[200] }}
          p={1}
          alignItems="center"
          gap={0.5}
        >
          <Stack
            sx={{
              borderWidth: 1,
              borderColor: theme.palette.text.disabled,
              borderStyle: 'solid',
              borderRadius: 2,
              p: 1,
            }}
            minWidth="30%"
          >
            <Typography variant="body2" color="textDisabled" fontSize={14}>
              {data.file.name}
            </Typography>
          </Stack>

          <IconButton color="error" onClick={onDeleteClick}>
            <Icons.Delete />
          </IconButton>
        </Stack>

        <Box sx={{ height: '30vh' }}>{renderContent()}</Box>
      </Stack>
      {!!fieldError && (
        <FormHelperText error>{fieldError.message}</FormHelperText>
      )}
    </>
  );
}
