import { useBooleanState } from '@/hooks';
import { Alert, Snackbar, type AlertProps } from '@mui/material';
import { useState, type JSX, type PropsWithChildren } from 'react';
import { AlertContext } from './context';
import type { AlertContextValue } from './types';

const ALERT_AUTOHIDE_TIMEOUT = 6 * 1000;

export function AlertContextProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const [alertShown, openAlert, closeAlert] = useBooleanState();
  const [severity, setSeverity] = useState<AlertProps['severity']>();
  const [message, setMessage] = useState('');

  const showAlert: NonNullable<AlertContextValue>['showAlert'] = (
    message,
    severity
  ) => {
    setSeverity(severity);
    setMessage(message);
    openAlert();
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert: closeAlert }}>
      {children}
      <Snackbar
        open={alertShown}
        autoHideDuration={ALERT_AUTOHIDE_TIMEOUT}
        onClose={closeAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={closeAlert}
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
}

export * from './hooks';
