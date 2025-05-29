import type { JSX } from 'react';
import type { CodeBlockProps } from './types';
import { Highlight, themes } from 'prism-react-renderer';
import { getPrismLanguage } from '@/utils';

export function CodeBlock({
  code,
  language,
  preElStyles,
  numberOfLinesToRender,
}: CodeBlockProps): JSX.Element {
  return (
    <Highlight
      theme={themes.github}
      code={code}
      language={getPrismLanguage(language)}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
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
