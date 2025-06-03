import type { CSSProperties } from 'react';

export interface CodeBlockProps {
  code: string;
  language: string;
  numberOfLinesToRender?: number;
  preElStyles?: CSSProperties;
}
