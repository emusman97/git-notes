import type { ButtonBaseProps, StackProps } from '@mui/material';

export type IconType = 'fork' | 'star';

export interface IconContainerProps extends StackProps {
  checked: boolean;
}

export interface IconNumberButtonProps extends ButtonBaseProps {
  iconType: IconType;
  numberToShow: number;
  checked?: boolean;
}
