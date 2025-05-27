import { parseISO, formatDistanceToNow } from 'date-fns';
import { AppStrings } from '@/constants';

export const delay = (duration = 600) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, duration);
  });

export const isError = (error: unknown) => error instanceof Error;

export const safeParseNumber = (value: string, defaultValue = -1) => {
  try {
    const parsedValue = Number(value);
    return isNaN(parsedValue) ? defaultValue : parsedValue;
  } catch (error) {
    console.log('Unable to parse ', value, error);
    return defaultValue;
  }
};

export const getInitials = (name: string) => {
  const [fname, lname] = name.split(' ');
  return `${fname?.toUpperCase()?.[0]} ${lname?.toUpperCase()?.[0]}`;
};

export const timeAgo = (dateString: string): string => {
  try {
    const date = parseISO(dateString);

    if (isNaN(date.getTime())) {
      return AppStrings.InvalidDate;
    }

    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.log('Error calculating time ago', error);
    return AppStrings.InvalidDate;
  }
};
