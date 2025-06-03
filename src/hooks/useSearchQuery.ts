import { useState } from 'react';

export function useSearchQuery(defaultValue = '') {
  const [query, setQuery] = useState(defaultValue);

  const createValueChangeHandler =
    (valueMapper: (value: string) => string) => (newValue: string) => {
      setQuery(valueMapper?.(newValue));
    };
  const handleQueryValueChange = (newValue: string) => {
    setQuery(newValue);
  };

  return { query, handleQueryValueChange, createValueChangeHandler } as const;
}
