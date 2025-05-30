import { Button, styled } from '@mui/material';

export const LoadingButton = styled(Button)(({ theme }) => ({
  '&.Mui-disabled': {
    background: theme.palette.secondary.dark,
  },
}));
