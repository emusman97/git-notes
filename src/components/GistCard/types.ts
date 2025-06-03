import type { Gist } from '@/models';
import type { StackProps } from '@mui/material';

export interface GistCardProps extends StackProps {
  data: Gist;
}

export interface CodeBlockSnippetProps extends StackProps {
  hovered: boolean;
  files: NonNullable<Gist['files']>;
  gistUpdatedAt: string;
}
