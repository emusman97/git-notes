import { safeParseNumber } from '@/utils';
import type { Pagination } from './types';

const linkRegex = /<([^>]+)>;\s*rel="([^"]+)"/;

export const parseLinkHeader = (headerValue: string): Pagination => {
  if (!headerValue) {
    return { totalPages: 1, hasMorePage: false };
  }

  const links = headerValue.split(',').reduce(
    (acc, link) => {
      const match = link.match(linkRegex);

      if (match) {
        const [, url, rel] = match;
        acc[rel] = new URL(url).searchParams.get('page') ?? '';
        if (rel === 'next') {
          acc[rel] = 'true';
        }
      }

      return acc;
    },
    {} as Record<string, string>
  );

  return {
    totalPages: links.last ? safeParseNumber(links.last, 1) : 1,
    hasMorePage: !!links.next,
  };
};
