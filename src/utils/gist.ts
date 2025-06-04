import type { GistFiles, GistId } from '@/models';

const FILENAME_REGEX = /^(?!gistfile[0-9]+).*$/i;

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
const MimeTypeToLanguageMap: Record<string, string> = {
  'text/javascript': 'javascript',
  'application/javascript': 'javascript',
  'text/x-python': 'python',
  'text/x-markdown': 'markdown',
  'application/json': 'json',
  'text/html': 'html',
  'text/css': 'css',
  'application/typescript': 'typescript',
  'text/x-c++': 'cpp',
  'text/x-c': 'c',
  'text/x-csharp': 'csharp',
  'text/x-java': 'java',
  'text/x-ruby': 'ruby',
  'text/x-php': 'php',
  'text/x-go': 'go',
  'application/sql': 'sql',
  'application/x-yaml': 'yaml',
  'text/plain': 'plaintext',
  'text/x-shellscript': 'bash',
  'application/x-dockerfile': 'docker',
} as const;

export const getFile = (files: GistFiles) => Object.values(files)?.[0];

export const getFilename = (files: GistFiles) => getFile(files)?.filename ?? '';

export const getPrismLanguage = (languageValue: string) =>
  LanguageMap[languageValue] ?? '';

export const getPrismLanguageFromMimeType = (mimeType: string) =>
  MimeTypeToLanguageMap[mimeType] ?? '';

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

export const isValidFileName = (filename: string) =>
  FILENAME_REGEX.test(filename);
