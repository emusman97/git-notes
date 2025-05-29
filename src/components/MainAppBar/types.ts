export interface MainAppBarProps {
  showSearch?: boolean;
  query?: string;
  onQueryChange?: (newValue: string) => void;
}
