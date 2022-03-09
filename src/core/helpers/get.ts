/* eslint-disable @typescript-eslint/no-explicit-any */
const get = <T, K>(object: T, path: string | number | symbol, defaultValue?: unknown): K | undefined => {
  const result = String(path)
    .replace(/\[/g, '.')
    .replace(/\]/g, '')
    .split('.')
    .reduce((objectSoFar: T | any, step: string) => {
      if (typeof objectSoFar === 'object' || Array.isArray(objectSoFar)) {
        return objectSoFar[step];
      }

      return undefined;
    }, object);

  return result === undefined ? defaultValue : result;
};

export default get;
