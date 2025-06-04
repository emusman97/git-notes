import { FormControl, FormHelperText, OutlinedInput } from '@mui/material';
import type { JSX } from 'react';
import type { InputFieldProps } from './types';

export function InputField({
  placeholder,
  error,
  errorText,
  ...restProps
}: InputFieldProps): JSX.Element {
  return (
    <FormControl>
      <OutlinedInput placeholder={placeholder} error={error} {...restProps} />
      {error && <FormHelperText error>{errorText}</FormHelperText>}
    </FormControl>
  );
}
