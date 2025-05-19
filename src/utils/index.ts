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
