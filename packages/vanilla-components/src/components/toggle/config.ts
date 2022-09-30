import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '@/core/config'
import { mergeClasses } from '@/core/helpers'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '@/core/types'

export const toggleConfig = {
  fixedClasses: {

    wrapper: '',
    wrapperLeft: 'flex items-center justify-start',
    wrapperCenter: 'flex items-center justify-center',
    wrapperRight: 'flex items-center justify-end',

    toggle: mergeClasses(
      'relative inline-flex flex-shrink-0  cursor-pointer',
      'border-2 border-transparent',
      'h-6 w-11',
      'rounded-full',
      'transition-colors ease-in-out duration-200',
      commonClasses.buttonRing,
    ),
    checked: '',
    unchecked: '',
    iconChecked: 'h-3 w-3',
    iconUnchecked: 'h-3 w-3',
  },

  // Default Input appearance
  classes: {

    wrapper: '',
    wrapperLeft: '',
    wrapperCenter: '',
    wrapperRight: '',

    toggle: 'focus:ring-offset-2 focus:ring-primary-600',
    checked: 'bg-primary-600',
    unchecked: 'bg-gray-200 dark:bg-gray-900 dark:border-gray-700',
    iconChecked: 'text-primary-600',
    iconUnchecked: 'text-gray-400 dark:text-gray-900',
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper: '',
        toggle: 'focus:ring-offset-2 focus:ring-red-600',
        checked: 'bg-red-600',
        unchecked: 'bg-red-600/50 dark:bg-red-500/70',
        iconChecked: 'text-red-600',
        iconUnchecked: 'text-red-400',
      },
    },
  },
}

export const toggleClassesKeys = Object.keys(toggleConfig.classes)

export declare type ToggleClassesValidKeys = keyof typeof toggleConfig.classes

export declare type ToggleSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[]

export declare type ToggleValue = ToggleSimpleValue | ToggleSimpleValue[] | ObjectWithProperties<ToggleSimpleValue>

export declare type ToggleProps = WithVariantPropsAndClassesList<{
    modelValue?: ToggleValue
    value?: ToggleValue
    checkedValue?: ToggleValue
    uncheckedValue?: ToggleValue
    type?: 'checkbox'
    checked?: boolean
} & InputHTMLAttributes & Data, ToggleClassesValidKeys>

