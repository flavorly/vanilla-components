import { isObject } from '@vueuse/core'
import type { CSSClassKeyValuePair, CSSClasses, CssClass } from '../types'
import { get } from '../helpers'

/**
 * Select the clases
 * @param classesObject
 */
export const selectClasses = (classesObject: CSSClassKeyValuePair): CSSClasses => Object.keys(classesObject).filter((className: string) => !!classesObject[className])

/**
 * Merge the classes recursively
 * @param classes
 */
export const mergeClasses = (...classes: CSSClasses): string => classes
  .map((className: CssClass): string => {
    if (typeof className === 'string' || className === undefined) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      return className
    }

    if (Array.isArray(className)) {
      return mergeClasses(...className)
    }

    return mergeClasses(...selectClasses(className))
  })
  .join(' ')
  .replace(/  +/g, ' ')
  .trim()

/**
 * Merge the classes recursively from a nested object
 * @param objectOne
 * @param objectTwo
 * @param mergeDeep
 */

export const mergeClassesFromObject = (objectOne: object | CssClass, objectTwo: object | CssClass, mergeDeep = false) => {
  const temporary = {}
  for (const [key, value] of Object.entries(objectOne as object)) {
    if (isObject(value)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      temporary[key] = mergeClassesFromObject(value, get(objectTwo, key, {}))
    }
    else {
      if (mergeDeep) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        temporary[key] = mergeClasses(
          value,
          get(objectTwo, key, undefined),
        )
      }
      else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        temporary[key] = value
      }
    }
  }
  return temporary
}

