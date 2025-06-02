import type { GistFiles, GistId } from '@/models';

const LanguageMap: Record<string, string> = {
  JavaScript: 'javascript',
  Python: 'python',
  Markdown: 'markdown',
  JSON: 'json',
  HTML: 'html',
  CSS: 'css',
  TypeScript: 'typescript',
  'C++': 'cpp',
  C: 'c',
  'C#': 'csharp',
  Java: 'java',
  Ruby: 'ruby',
  PHP: 'php',
  Go: 'go',
  SQL: 'sql',
  YAML: 'yaml',
  Text: 'plaintext',
  Shell: 'bash',
  Dockerfile: 'docker',
} as const;

export const getFile = (files: GistFiles) => Object.values(files)?.[0];

export const getFilename = (files: GistFiles) => getFile(files)?.filename ?? '';

export const getPrismLanguage = (languageValue: string) =>
  LanguageMap[languageValue] ?? '';

export const makeItemKey = (id: GistId, index: number) => `${id}-${index}`;

export const formatNumber = (num: number): string => {
  if (num === null || num === undefined || isNaN(num)) return '0';

  const absNum = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (absNum >= 1_000_000_000) {
    return `${sign}${(absNum / 1_000_000_000).toFixed(1).replace(/\.0$/, '')}B`;
  }
  if (absNum >= 1_000_000) {
    return `${sign}${(absNum / 1_000_000).toFixed(1).replace(/\.0$/, '')}M`;
  }
  if (absNum >= 1_000) {
    return `${sign}${(absNum / 1_000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return `${sign}${absNum}`;
};
