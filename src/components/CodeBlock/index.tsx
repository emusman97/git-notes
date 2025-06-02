import { useMemo, type JSX } from 'react';
import type { CodeBlockProps } from './types';
import { Highlight, themes } from 'prism-react-renderer';
import { getPrismLanguage } from '@/utils';
import { useIsDarkMode } from '@/hooks';

export function CodeBlock({
  code,
  language,
  preElStyles,
  numberOfLinesToRender,
}: CodeBlockProps): JSX.Element {
  const isDark = useIsDarkMode();

  const theme = useMemo(
    () => (isDark ? themes.duotoneDark : themes.duotoneLight),
    [isDark]
  );

  return (
    <Highlight theme={theme} code={code} language={getPrismLanguage(language)}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
            padding: 10,
            height: '100%',
            whiteSpace: 'pre-wrap', // Wrap long lines to prevent horizontal overflow
            ...preElStyles,
          }}
        >
          {tokens.slice(0, numberOfLinesToRender).map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
