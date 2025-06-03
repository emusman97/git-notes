import type { AlertProps } from '@mui/material';

export interface AlertContext {
  showAlert: (message: string, severity: AlertProps['severity']) => void;
  hideAlert: () => void;
}

export type AlertContextValue = AlertContext | null;
