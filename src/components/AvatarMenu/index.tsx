import { AppStrings } from '@/constants';
import { FirebaseService } from '@/core';
import { RoutePaths } from '@/routes';
import { useUserState } from '@/state';
import { getInitials } from '@/utils';
import { Divider, MenuItem, Stack, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton, { type IconButtonProps } from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Tooltip from '@mui/material/Tooltip';
import { useState, type JSX } from 'react';
import { useNavigate } from 'react-router';

export function AvatarMenu(): JSX.Element {
  const { details } = useUserState();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>();

  const handleOpenMenu: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(undefined);
  };
  const handleLogout = () => {
    FirebaseService.Auth.logout();
  };

  const gotoMyGists = () => {
    navigate(RoutePaths.MyGists);
  };
  const gotoMyGithubProfile = () => {};

  const renderDivider = () => <Divider sx={{ ml: 1, mr: 1 }} />;

  return (
    <>
      <Tooltip title={AppStrings.OpenMenu}>
        <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
          <Avatar src={details?.avatar}>
            {getInitials(details?.name ?? '')}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <Stack>
          <MenuItem
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              '&.MuiMenuItem-root': {
                pointerEvents: 'none',
              },
            }}
          >
            <Typography fontSize={11}>{AppStrings.SignedInAs}</Typography>
            <Typography fontSize={14} variant="h6" fontWeight={700}>
              {details?.name}
            </Typography>
          </MenuItem>

          {renderDivider()}

          <MenuItem onClick={gotoMyGists}>
            <Typography>{AppStrings.YourGists}</Typography>
          </MenuItem>
          <MenuItem>
            <Typography>{AppStrings.StarredGists}</Typography>
          </MenuItem>
          <MenuItem onClick={gotoMyGithubProfile}>
            <Typography>{AppStrings.YourGithubProfile}</Typography>
          </MenuItem>

          {renderDivider()}

          <MenuItem>
            <Typography>{AppStrings.Help}</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography>{AppStrings.Signout}</Typography>
          </MenuItem>
        </Stack>
      </Menu>
    </>
  );
}
