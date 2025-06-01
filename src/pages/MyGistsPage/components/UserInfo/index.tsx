import { useSelectUserInfo } from '@/state';
import type { JSX } from 'react';
import type { UserInfoProps } from './types';
import { Avatar, Button, Stack, Typography } from '@mui/material';
import { getInitials } from '@/utils';
import { AppStrings } from '@/constants';

export function UserInfo({ ...restProps }: UserInfoProps): JSX.Element {
  const user = useSelectUserInfo();

  return (
    <Stack gap={2} alignItems="center" {...restProps}>
      <Avatar sx={{ height: 250, width: 250 }} src={user?.avatar ?? ''}>
        {getInitials(user?.name ?? '')}
      </Avatar>
      <Typography variant="h2" fontSize={24} fontWeight={400}>
        {user?.name}
      </Typography>
      <Button variant="contained">{AppStrings.ViewGithubProfile}</Button>
    </Stack>
  );
}
