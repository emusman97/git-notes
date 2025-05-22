import { Images } from '@/assets';
import { AppStrings } from '@/constants';
import { RoutePaths } from '@/routes';
import { Box, Button, IconButton, Stack, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import type { JSX } from 'react';
import { useNavigate } from 'react-router';
import { Search } from './components';

export function MainAppBar(): JSX.Element {
  const navigate = useNavigate();

  const gotoHome = () => navigate(RoutePaths.Root);

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton onClick={gotoHome}>
          <Box
            component="img"
            src={Images.logo}
            alt={AppStrings.LogoAltText}
            sx={{ height: 30, width: 'auto' }}
          />
        </IconButton>

        <Stack flexDirection="row" gap={4}>
          <Search />

          <Button variant="contained" color="secondary" sx={{ pl: 4, pr: 4 }}>
            {AppStrings.Login}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
