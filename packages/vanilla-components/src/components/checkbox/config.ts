import type { InputHTMLAttributes } from 'vue'
import { mergeClasses } from '@/core/helpers'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '@/core/types'

export const checkboxConfig = {
  fixedClasses: {
    wrapper: '',
    wrapperLeft: 'flex items-center justify-start',
    wrapperCenter: 'flex items-center justify-center',
    wrapperRight: 'flex items-center justify-end',
    container: '',
    checkbox: 'h-5 w-5 transition duration-150 ease-in-out relative',

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

export const checkboxClassesKeys = Object.keys(checkboxConfig.classes)

export declare type CheckboxClassesValidKeys = keyof typeof checkboxConfig.classes

export declare type CheckboxSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[]

export declare type CheckboxValue = CheckboxSimpleValue | CheckboxSimpleValue[] | ObjectWithProperties<CheckboxSimpleValue>

export declare type CheckboxProps = WithVariantPropsAndClassesList<{
    modelValue?: CheckboxValue
    value?: CheckboxValue
    checkedValue?: CheckboxValue
    uncheckedValue?: CheckboxValue
    type?: 'checkbox'
    checked?: boolean
} & InputHTMLAttributes & Data, CheckboxClassesValidKeys>

