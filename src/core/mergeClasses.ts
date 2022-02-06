import {
  CSSClass,
  CSSClasses,
  CSSClassKeyValuePair,
} from '@/core/types';

export const selectClasses = (classesObject: CSSClassKeyValuePair): CSSClasses => Object.keys(classesObject).filter((className: string) => !!classesObject[className]);

const mergeClasses = (...classes: CSSClasses): string => classes
  .map((className: CSSClass): string => {
    if (typeof className === 'string' || className === undefined) {
      return className || '';
    }

    if (Array.isArray(className)) {
      return mergeClasses(...className);
    }

    return mergeClasses(...selectClasses(className));
  })
  .join(' ')
  .replace(/  +/g, ' ')
  .trim();

export default mergeClasses;
