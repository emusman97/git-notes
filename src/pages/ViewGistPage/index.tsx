import { CodeBlock, GistInfo, MainLayout } from '@/components';
import {
  GetForksCountQueryKeys,
  IsStarredQueryKeys,
  useFetchFileQuery,
  useForkMutation,
  useGetForksCountQuery,
  useIsStarredQuery,
  useStarUnstarMutation,
  type StarOperation,
} from '@/core';
import type { Gist } from '@/models';
import { getFile } from '@/utils';
import {
  Box,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, type JSX } from 'react';
import { useLocation } from 'react-router';
import { IconNumberButton } from './components';
import { useSelectIsAuthenticated } from '@/state';
import { useQueryClient } from '@tanstack/react-query';

export function ViewGistPage(): JSX.Element {
  const { state } = useLocation();
  const queryClient = useQueryClient();

  const isAuthenticated = useSelectIsAuthenticated();

  const gist = state as Gist;
  const gistId = gist.id ?? '';
  const file = useMemo(() => getFile(gist.files ?? {}), [gist]);

  const { data: forksCount, isFetching: isFetchingForksCount } =
    useGetForksCountQuery(gistId);
  const { data: isStarred, isFetching: isCheckingStarred } =
    useIsStarredQuery(gistId);
  const { data, isLoading, isFetching } = useFetchFileQuery(
    file,
    gist.updated_at ?? ''
  );
  const { mutate: fork, isPending: isForkPending } = useForkMutation(gistId);
  const { mutate: starUnstar, isPending: isStarUnstatPending } =
    useStarUnstarMutation(gistId);

  const isLoadingGistFile = isLoading || isFetching;
  const isPending = isForkPending || isStarUnstatPending;
  const isLoadingButtons =
    isFetchingForksCount || isCheckingStarred || isPending;

  const handleForkClick = () => {
    fork(undefined, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: GetForksCountQueryKeys.withId(gistId),
        });
      },
    });
  };
  const handleStarClick = () => {
    const starOp: StarOperation = isStarred ? 'unstar' : 'star';

    starUnstar(starOp, {
      onSuccess() {
        queryClient.invalidateQueries({
          queryKey: IsStarredQueryKeys.withId(gistId),
        });
      },
    });
  };

  const renderButtons = () =>
    isLoadingButtons ? (
      <Skeleton height="10vh" width="10vw" />
    ) : (
      <>
        <IconNumberButton
          checked
          iconType="fork"
          numberToShow={forksCount ?? 0}
          onClick={handleForkClick}
        />
        <IconNumberButton
          checked={isStarred}
          iconType="star"
          numberToShow={isStarred ? 1 : 0}
          onClick={handleStarClick}
        />
      </>
    );

  return (
    <MainLayout>
      <Stack
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <GistInfo data={gist} />

        {isAuthenticated && (
          <Stack flexDirection="row" alignItems="center" gap={1}>
            {renderButtons()}
          </Stack>
        )}
      </Stack>

      <Stack mt={4} flex={1} component={Paper}>
        <Typography p={1} fontSize={11}>
          {file.filename}
        </Typography>
        <Divider />

        <Box
          sx={{
            height: '75vh',
            width: 'auto',
          }}
        >
          {isLoadingGistFile ? (
            <Skeleton variant="rectangular" height="100%" width="100%" />
          ) : (
            <CodeBlock
              code={data ?? ''}
              language={file.language ?? ''}
              preElStyles={{ overflow: 'auto' }}
            />
          )}
        </Box>
      </Stack>
    </MainLayout>
  );
}
