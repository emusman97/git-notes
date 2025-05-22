import { MainAppBar } from '@/components/MainAppBar';
import { Container, Stack } from '@mui/material';
import type { JSX, PropsWithChildren } from 'react';

export function MainLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <Stack sx={{ minHeight: '100vh', height: '100%' }}>
      <MainAppBar />
      <Container sx={{ flex: 1, pt: 2, pb: 2 }}>{children}</Container>
    </Stack>
  );
}
