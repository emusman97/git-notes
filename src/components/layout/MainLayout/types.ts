import type { MainAppBarProps } from '@/components/MainAppBar';
import type { PropsWithChildren } from 'react';

export interface MainLayoutProps extends PropsWithChildren, MainAppBarProps {
  query?: string;
  onQueryChange?: (newValue: string) => void;
}
