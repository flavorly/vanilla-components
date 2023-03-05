// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { isObject } from '@vueuse/core'
import type { CSSClassKeyValuePair, CSSClasses, CssClass } from '../types'
import { get } from '../helpers'

/**
 * Select the clases
 * @param classesObject
 */
export const selectClasses = (classesObject: CSSClassKeyValuePair): CSSClasses => Object.keys(classesObject).filter((className: string) => !!classesObject[className])

/**
 * Removes everything before the "$reset" keyword
 *
 * @param classes - The second object ( classes )
 */
export const removeClassesBeforeResetDirect = (classes: CssClass): CSSClasses => {
  const pattern = /\$reset\s*/
  const match = pattern.exec(classes)
  if (match === null) {
    return classes // return the original string if "$reset" is not found
  }
  return classes.slice(match.index + match[0].length)
}

/**
 * Merge the classes recursively
 * @param classes
 */
export const mergeClasses = (...classes: CSSClasses): string => classes
  .map((className: CssClass): string => {
    if (typeof className === 'string' || className === undefined) {
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
 * TODO: Check if by inverting two and one we are not breaking something!!!
 *
 * @param objectOne - The second object ( classes )
 * @param objectTwo - The first Object ( Fixed classes )
 * @param mergeDeep
 */
export const mergeClassesFromObject = (objectTwo: object | CssClass, objectOne: object | CssClass, mergeDeep = false) => {
  const temporary = {}
  for (const [key, value] of Object.entries(objectOne || {} as object)) {
    if (isObject(value)) {
      temporary[key] = mergeClassesFromObject(value, get(objectTwo || {}, key, {}))
    }
    else {
      if (mergeDeep) {
        let merged = mergeClasses(
          value,
          get(objectTwo || {}, key, undefined),
        )
        if (merged) {
          merged = removeClassesBeforeResetDirect(merged)
        }
        temporary[key] = merged
      }
      else {
        temporary[key] = removeClassesBeforeResetDirect(value)
      }
    }
  }
  return temporary
}

