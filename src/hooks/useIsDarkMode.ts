import { useColorScheme } from '@mui/material';

export function useIsDarkMode() {
  const { mode, systemMode } = useColorScheme();

  return mode === 'dark' || (mode === 'system' && systemMode === 'dark');
}
