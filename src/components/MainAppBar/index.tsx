import { Images } from '@/assets';
import { AppStrings } from '@/constants';
import { FirebaseService, LocalStorageKeys, LocalStorageService } from '@/core';
import { RoutePaths } from '@/routes';
import { useAppDispatch, userActions, useUserState } from '@/state';
import { Box, IconButton, Stack, Toolbar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { AvatarMenu } from '../AvatarMenu';
import { LoadingButton, Search } from './components';
import { createUser } from '@/models';
import { useAuthStateChange } from '@/hooks';
import type { MainAppBarProps } from './types';

export function MainAppBar({
  showSearch = false,
  query,
  onQueryChange,
}: MainAppBarProps): JSX.Element {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useUserState();

  const navigate = useNavigate();
  useAuthStateChange();

  const [loading, setLoading] = useState(false);

  const gotoHome = () => navigate(RoutePaths.Root);

  const handleLogin = async () => {
    setLoading(true);

    const result = await FirebaseService.Auth.signInWithGithub();

    if (result.success) {
      const token = result.value?.accessToken ?? '';

      LocalStorageService.setString(LocalStorageKeys.GithubToken, token);
      if (result.value?.user) {
        dispatch(userActions.login(createUser(result.value.user)));
      }
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
          {showSearch && <Search value={query} onValueChange={onQueryChange} />}

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

export * from './types';
