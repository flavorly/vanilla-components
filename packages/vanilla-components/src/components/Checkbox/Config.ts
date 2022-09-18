import mapValues from 'lodash/mapValues'
import { mergeClasses } from '../../core'

export const VanillaCheckboxConfig = {
  fixedClasses: {
    wrapper: '',
    wrapperLeft: 'flex items-center justify-start',
    wrapperCenter: 'flex items-center justify-center',
    wrapperRight: 'flex items-center justify-end',
    container: '',
    checkbox: 'h-5 w-5 transition duration-150 ease-in-out block',

    groupContainer: 'space-y-3',
    groupCheckboxWrapper: 'relative flex items-start',
    groupCheckbox: 'flex items-center h-5',
    groupLabel: 'ml-3 text-sm leading-5',
  },

  // Default Input appearance
  classes: {
    wrapper: '',
    wrapperLeft: '',
    wrapperCenter: '',
    wrapperRight: '',

    container: '',
    checkbox: mergeClasses(
      'checked:bg-primary-600 checked:text-white',
      'dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-primary-600',
    ),
    groupContainer: '',
    groupCheckboxWrapper: '',
    groupCheckbox: '',
    groupLabel: '',
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper: '',
        container: '',
        checkbox: mergeClasses(
          'text-red-600 border-red-300 placeholder-red-300 dark:bg-gray-900',
          'focus:ring-red-500',
          'checked:bg-red-600 checked:text-white',
          'dark:checked:bg-red-600 dark:focus:ring-offset-gray-900',
        ),
        groupContainer: '',
        groupCheckboxWrapper: '',
        groupCheckbox: '',
        groupLabel: '',
      },
    },
  },
}

/**
 * Converts our own config into VariantJS config
 * @param configuration
 * @constructor
 */
export const VanillaCheckboxConfigToVariantJs = (configuration: any) => {
  return {
    fixedClasses: configuration.fixedClasses.checkbox,
    classes: VanillaCheckboxConfig.classes.checkbox,
    variants: mapValues(configuration.variants, (value) => {
      return {
        classes: value.classes.checkbox,
      }
    }),
  }
}

export const VanillaCheckboxClassesKeys = Object.keys(VanillaCheckboxConfig.classes)

export type VanillaCheckboxClassesValidKeys = keyof typeof VanillaCheckboxConfig.classes

