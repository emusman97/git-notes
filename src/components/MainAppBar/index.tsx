import { Images } from '@/assets';
import { AppStrings } from '@/constants';
import { FirebaseService, LocalStorageKeys, LocalStorageService } from '@/core';
import { useAuthStateChange } from '@/hooks';
import { createUser } from '@/models';
import { RoutePaths } from '@/routes';
import {
  useAppDispatch,
  userActions,
  useSelectLoading,
  useUserState,
} from '@/state';
import {
  Box,
  IconButton,
  Stack,
  Toolbar,
  useColorScheme,
  type SwitchProps,
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import { type JSX } from 'react';
import { useNavigate } from 'react-router';
import { AvatarMenu } from '../AvatarMenu';
import { LoadingButton, Search, ThemeSwitch } from './components';
import type { MainAppBarProps } from './types';

export function MainAppBar({
  showSearch = false,
  query,
  onQueryChange,
}: MainAppBarProps): JSX.Element {
  const dispatch = useAppDispatch();

  const loading = useSelectLoading();
  const { mode, systemMode, setMode } = useColorScheme();
  const { isAuthenticated } = useUserState();

  const navigate = useNavigate();
  useAuthStateChange();

  const gotoHome = () => navigate(RoutePaths.Root);

  const isDarkMode =
    mode === 'dark' || (mode === 'system' && systemMode === 'dark');

  const handleThemeSwitch: SwitchProps['onChange'] = () => {
    console.log(isDarkMode);
    if (isDarkMode) {
      setMode('light');
    } else {
      setMode('dark');
    }
  };
  const handleLogin = async () => {
    dispatch(userActions.setLoading(true));

    const result = await FirebaseService.Auth.signInWithGithub();

    if (result.success) {
      const token = result.value?.accessToken ?? '';

      LocalStorageService.setString(LocalStorageKeys.GithubToken, token);
      if (result.value?.user) {
        dispatch(userActions.login(createUser(result.value.user)));
      }
    }

    dispatch(userActions.setLoading(false));
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

        <Stack flexDirection="row" alignItems="center" gap={2}>
          <ThemeSwitch checked={isDarkMode} onChange={handleThemeSwitch} />

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
