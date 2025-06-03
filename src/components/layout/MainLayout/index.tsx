import { MainAppBar } from '@/components/MainAppBar';
import { Container, Stack } from '@mui/material';
import type { JSX } from 'react';
import type { MainLayoutProps } from './types';

export function MainLayout({
  children,
  ...restProps
}: MainLayoutProps): JSX.Element {
  return (
    <Stack sx={{ minHeight: '100vh', height: '100%' }}>
      <MainAppBar {...restProps} />
      <Container sx={{ flex: 1, pt: 2, pb: 2 }}>{children}</Container>
    </Stack>
  );
}
