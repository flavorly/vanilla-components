import type { InputHTMLAttributes } from 'vue'
import { mergeClasses } from '../../core/helpers'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '../../core/types'
import { commonClasses } from '../../core/config'

export const checkboxConfig = {
  fixedClasses: {
    wrapper: 'flex',
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
    checkbox: 'h-5 w-5 transition duration-150 ease-in-out relative rounded',
    label: {
      label: '',
    },
    groupContainer: 'grid grid-cols-1 space-y-3',
    groupCheckboxWrapper: 'relative flex items-start',
    groupCheckboxWrapperNotHighlighted: '',
    groupCheckboxWrapperHighlighted: '',
    groupCheckbox: 'flex items-center h-5',
    groupLabelWrapper: 'ml-3 text-sm leading-5',
    groupLabelFeedback: 'text-gray-500',

    disabled: commonClasses.disabled,
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
    checkbox: mergeClasses(
      'border-gray-300 text-primary-600 focus:ring-primary-500 checked:border-0',
      'dark:focus:ring-offset-gray-900 dark:border-gray-600 dark:bg-gray-900 dark:checked:bg-primary-600',
    ),
    label: {
      label: 'block font-medium text-sm text-gray-700 dark:text-white cursor-pointer',
    },
    groupContainer: '',
    groupCheckboxWrapper: '',
    groupCheckboxWrapperNotHighlighted: '',
    groupCheckboxWrapperHighlighted: '',
    groupCheckbox: '',
    groupLabelWrapper: '',
    groupLabelFeedback: '',

    disabled: '',
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
        label: {
          label: 'block font-medium text-sm text-gray-700 dark:text-white cursor-pointer',
        },
        groupContainer: '',
        groupCheckboxWrapper: '',
        groupCheckbox: '',
        groupLabelWrapper: '',
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
    navigation?: boolean
} & InputHTMLAttributes & Data, CheckboxClassesValidKeys>

