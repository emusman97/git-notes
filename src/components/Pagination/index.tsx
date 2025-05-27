import type { JSX } from 'react';
import type { PaginationProps } from './types';
import Stack from '@mui/material/Stack';
import { Icons } from '../Icons';
import { IconButton, styled, Typography } from '@mui/material';
import { AppStrings } from '@/constants';

const StyledTypography = styled(Typography)(({ theme }) => ({
  borderWidth: 1.5,
  borderStyle: 'solid',
  borderColor: theme.palette.divider,
  borderRadius: '0.3rem',
  padding: '0.25rem 0.8rem 0.25rem 0.8rem',
}));

export function Pagination({
  page,
  totalPages,
  prevButtonLoading,
  nextButtonLoading,
  onPreviousButtonClick,
  onNextButtonClick,
  ...restProps
}: PaginationProps): JSX.Element {
  return (
    <Stack gap={2} flexDirection="row" alignItems="center" {...restProps}>
      <IconButton
        disabled={page === 1}
        loading={prevButtonLoading}
        sx={{ padding: 0 }}
        onClick={onPreviousButtonClick}
      >
        <Icons.ArrowLeft />
      </IconButton>
      <Typography>{AppStrings.Page}</Typography>
      <StyledTypography>{page}</StyledTypography>
      <Typography>
        {AppStrings.Of} {totalPages}
      </Typography>
      <IconButton
        disabled={page === totalPages}
        loading={nextButtonLoading}
        onClick={onNextButtonClick}
        sx={{ padding: 0 }}
      >
        <Icons.ArrowRight />
      </IconButton>
    </Stack>
  );
}

export * from './types';
