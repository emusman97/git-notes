import type { GistFiles } from '@/models';

export const getFilename = (files: GistFiles) =>
  Object.values(files)?.[0]?.filename ?? '';
