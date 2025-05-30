import type { GistFiles } from '@/models';

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

export const getFilename = (files: GistFiles) =>
  Object.values(files)?.[0]?.filename ?? '';

export const getPrismLanguage = (languageValue: string) =>
  LanguageMap[languageValue] ?? '';
