import {
  CSSClass,
  CSSClasses,
  CSSClassKeyValuePair,
} from '@/core/types';

/**
 * Select the clases
 * @param classesObject
 */
export const selectClasses = (classesObject: CSSClassKeyValuePair): CSSClasses => Object.keys(classesObject).filter((className: string) => !!classesObject[className]);

/**
 * Merge the classes recursively
 * @param classes
 */
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
