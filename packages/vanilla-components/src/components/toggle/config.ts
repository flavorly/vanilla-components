import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '@/core/config'
import { mergeClasses } from '@/core/helpers'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '@/core/types'

export const toggleConfig = {
  fixedClasses: {

    wrapper: '',
    wrapperLeftTop: 'justify-start items-start',
    wrapperLeftCenter: 'justify-start items-center',
    wrapperLeftBottom: 'justify-start items-end',
    wrapperRightTop: 'justify-end items-start',
    wrapperRightCenter: 'justify-end items-center',
    wrapperRightBottom: 'justify-end items-end',
    wrapperCenterTop: 'justify-center items-start',
    wrapperCenterCenter: 'justify-center items-center',
    wrapperCenterBottom: 'justify-center items-end',

    container: '',

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

    groupContainer: 'space-y-3',
    groupToggleWrapper: 'relative flex items-start',
    groupToggle: 'flex items-center h-5',
    groupLabelWrapper: 'ml-3 text-sm leading-5',
    groupLabelFeedback: 'text-gray-500',

    label: {
      label: '',
    },
  },

  // Default Input appearance
  classes: {

    wrapper: '',
    wrapperLeftTop: '',
    wrapperLeftCenter: '',
    wrapperLeftBottom: '',
    wrapperRightTop: '',
    wrapperRightCenter: '',
    wrapperRightBottom: '',
    wrapperCenterTop: '',
    wrapperCenterCenter: '',
    wrapperCenterBottom: '',

    container: '',

    toggle: 'focus:ring-offset-2 focus:ring-primary-600',
    checked: 'bg-primary-600',
    unchecked: 'bg-gray-200 dark:bg-gray-900 dark:border-gray-700',
    iconChecked: 'text-primary-600',
    iconUnchecked: 'text-gray-400 dark:text-gray-900',

    iconWrapper: 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 flex items-center justify-center',

    transitionChecked: 'translate-x-5',
    transitionUnchecked: 'translate-x-0',

    label: {
      label: 'block font-medium text-sm text-gray-700 dark:text-white cursor-pointer',
    },

    groupContainer: '',
    groupToggleWrapper: '',
    groupToggle: '',
    groupLabelWrapper: '',
    groupLabelFeedback: '',
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

        label: {
          label: 'block font-medium text-sm text-gray-700 dark:text-white cursor-pointer',
        },
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
    type?: 'Toggle'
    checked?: boolean
    icon?: boolean
} & InputHTMLAttributes & Data, ToggleClassesValidKeys>

