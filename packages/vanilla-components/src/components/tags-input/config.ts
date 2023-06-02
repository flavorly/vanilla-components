import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'
import { mergeClasses } from '../../core/helpers'
import { commonClasses } from '../../core/config'

export const tagsInputConfig = {
  fixedClasses: {
    input: mergeClasses(
      'appearance-none px-2 m-1 focus:ring-0 focus:outline-none focus:shadow-none w-full bg-transparent',
      commonClasses.inputsRadius,
    ),
    inputWrapper: 'inline-flex flex-grow',
    tagsWrapper: 'flex flex-wrap overflow-hidden -my-2 py-1 w-full',
    tagDeleteButtonIcon: 'w-3 h-3',
    tagLabel: 'px-3',
  },
  classes: {
    input: '',
    inputWrapper: '',
    tagsWrapper: '',
    tagDeleteButtonIcon: '',
    tagLabel: '',
    tag: mergeClasses(
        'rounded shadow-sm flex items-center cursor-pointer',
        'bg-primary-100 dark:bg-primary-500/20 dark:border dark:border-gray-700',
        'm-0.5 h-8 max-w-full',
        'text-primary-900 dark:text-white white-space-no text-sm font-semibold',
        commonClasses.buttonRing,
        'focus:ring-opacity-50 focus:ring-primary-600',
        commonClasses.inputsTransition,
        commonClasses.inputsDisabled,
    ),
    tagDeleteButton: mergeClasses(
        commonClasses.inputsTransition,
        commonClasses.buttonRing,
        'focus:ring-opacity-50 focus:ring-primary-600',
        '-ml-1.5 h-full hover:shadow-sm inline-flex items-center px-2 rounded-r',
        'text-primary-400 focus:text-white hover:text-primary-500 dark:hover:text-white',
        'hover:bg-primary-200 focus:bg-primary-500 dark:hover:bg-primary-400/20 dark:focus:bg-primary-500/20',
    ),
    trigger: mergeClasses(
      commonClasses.inputsBackground,
      commonClasses.inputsBorder,
      commonClasses.inputsRingBase,
      commonClasses.inputsRing,
      commonClasses.inputsText,
      commonClasses.inputsTransition,
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
      commonClasses.inputsRadius,
      'px-2 py-3',
      'relative flex items-center w-full focus:z-10 cursor-pointer max-w-full w-full',
    ),
  },

  // Variants
  variants: {

    // Used for Errors
    error: {
      classes: {
        input: mergeClasses(
          commonClasses.inputsErrorsRing,
          commonClasses.inputsErrorTextColor,
          commonClasses.inputsText,
        ),
        inputWrapper: '',
        tagsWrapper: '',
        tagDeleteButtonIcon: '',
        tagLabel: '',
        tag: mergeClasses(
          'rounded shadow-sm flex items-center cursor-pointer',
          'bg-red-100 dark:bg-red-500/20 dark:border dark:border-gray-700',
          'm-0.5 h-8 max-w-full',
          'text-red-900 dark:text-red-300 white-space-no text-sm font-semibold',
          'focus:ring-opacity-50 focus:ring-red-600',
          commonClasses.buttonErrorsRing,
          commonClasses.inputsTransition,
          commonClasses.inputsDisabled,
        ),
        tagDeleteButton: mergeClasses(
          commonClasses.inputsTransition,
          commonClasses.buttonErrorsRing,
          'focus:ring-opacity-50',
          '-ml-1.5 h-full hover:shadow-sm inline-flex items-center px-2 rounded-r',
          'text-red-900 dark:text-red-300 focus:text-white hover:text-red-800 dark:hover:text-red-200',
          'hover:bg-red-200 focus:bg-red-500 dark:hover:bg-red-400/20 dark:focus:bg-red-500/20',
        ),
        trigger: mergeClasses(
          commonClasses.inputsRingBase,
          commonClasses.inputsErrorsBackground,
          commonClasses.inputsErrorsBorder,
          commonClasses.inputsErrorsRing,
          commonClasses.inputsErrorTextColor,
          commonClasses.inputsText,
          commonClasses.inputsTransition,
          commonClasses.inputsShadows,
          commonClasses.inputsDisabled,
          commonClasses.inputsRadius,
          'px-2 py-3',
          'relative flex items-center w-full focus:z-10 cursor-pointer max-w-full w-full',
        ),
      },
    },
  },
}

export const tagsInputClassesKeys = Object.keys(tagsInputConfig.classes)

export declare type TagsInputClassesValidKeys = keyof typeof tagsInputConfig.classes

export declare type TagsInputValue = string[] | number[]

export declare type TagsInputProps = WithVariantPropsAndClassesList<{
  modelValue?: TagsInputValue
  type?: string
  placeholder?: string
  copiable?: boolean
} & InputHTMLAttributes & Data, TagsInputClassesValidKeys>

