import promisify from './promisify';

/* eslint-disable @typescript-eslint/no-explicit-any */
const promisifyFunctionResult = <P extends any[], K>(fn: (...args: P) => K | Promise<K>, ...args: P) : Promise<K> => {
  const result = fn(...args);

  return promisify<K>(result);
};

export default promisifyFunctionResult;
