import { Images } from '@/assets';
import { AppStrings } from '@/constants';
import { FirebaseService, LocalStorageService } from '@/core';
import { RoutePaths } from '@/routes';
import { useUserState } from '@/state';
import { Box, IconButton, Stack, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { AvatarMenu } from '../AvatarMenu';
import { LoadingButton, Search } from './components';
import { useAuthStateChange } from '@/hooks';

export function MainAppBar(): JSX.Element {
  const { isAuthenticated } = useUserState();

  const navigate = useNavigate();
  useAuthStateChange();

  const [loading, setLoading] = useState(false);

  const gotoHome = () => navigate(RoutePaths.Root);

  const handleLogin = async () => {
    setLoading(true);

    const result = await FirebaseService.Auth.signInWithGithub();

    if (result.success) {
      LocalStorageService.setString(
        'GithubToken',
        result.value?.accessToken ?? ''
      );
    }

    setLoading(false);
  };

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

        <Stack flexDirection="row" gap={3}>
          <Search />

          {isAuthenticated ? (
            <AvatarMenu />
          ) : (
            <LoadingButton
              variant="contained"
              color="secondary"
              loading={loading}
              loadingPosition="start"
              onClick={handleLogin}
            >
              {AppStrings.Login}
            </LoadingButton>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
