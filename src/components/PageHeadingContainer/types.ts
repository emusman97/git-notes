import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export interface PageHeadingContainerProps extends StackProps {
  title: string;
  RightComponent?: ReactNode;
}
