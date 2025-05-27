import type { Gist } from '@/models';
import type { PaperProps } from '@mui/material';

export interface GistCardProps extends PaperProps {
  data: Gist;
}

export interface CodeBlockSnippetProps {
  files: NonNullable<Gist['files']>;
}
