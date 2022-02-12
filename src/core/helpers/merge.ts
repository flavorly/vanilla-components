// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default function deepMerge(...objects) {
  const isObject = (obj: never) => obj && typeof obj === 'object';

  function deepMergeInner(target: object, source: object) {
    Object.keys(source).forEach((key: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const targetValue = target[key];
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const sourceValue = source[key];

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[key] = targetValue.concat(sourceValue);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else if (isObject(targetValue) && isObject(sourceValue)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[key] = deepMergeInner(Object.assign({}, targetValue), sourceValue);
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        target[key] = sourceValue;
      }
    });

    return target;
  }

  if (objects.length < 2) {
    throw new Error('deepMerge: this function expects at least 2 objects to be provided');
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (objects.some(object => !isObject(object))) {
    throw new Error('deepMerge: all values should be of type "object"');
  }

  const target = objects.shift();
  let source: object;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  while (source = objects.shift()) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignores
    deepMergeInner(target, source);
  }

  return target;
}
