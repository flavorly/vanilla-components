import type { InputHTMLAttributes } from 'vue'
import { mergeClasses } from '../../core/helpers'
import { commonClasses } from '../../core/config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const buttonConfig = {
  fixedClasses: {
    button: mergeClasses(
      commonClasses.buttonPosition,
      'focus:ring-offset-2',
      'cursor-pointer',
    ),
    container: 'flex items-center space-x-1',
    spinner: 'animate-spin -ml-1 mr-1 h-5 w-5 text-whit',
    disableOpacity: 'opacity-50',
    enableOpacity: 'opacity-100',
    busyOrInvalidState: 'cursor-not-allowed',
  },

  // Default Input appearance
  classes: {
    button: mergeClasses(
      commonClasses.buttonRadius,
      commonClasses.buttonText,
      commonClasses.buttonRing,
      commonClasses.buttonSizing,
      commonClasses.buttonSpacing,
      commonClasses.buttonShadow,
      'focus:ring-primary-600',
      'text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white',
      'bg-white dark:bg-gray-800',
      'border border-gray-300 dark:border-gray-600 dark:focus:border-primary-600',
    ),
    container: ' ',
    spinner: '',
    disableOpacity: '',
    enableOpacity: '',
    busyOrInvalidState: '',
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonRadius,
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonSpacing,
          commonClasses.buttonShadow,
          'focus:ring-red-500',
          'text-white focus:text-gray-200',
          'bg-red-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
      },
    },

    // Soft Variant for errors
    errorSoft: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonRadius,
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonSpacing,
          commonClasses.buttonShadow,
          'focus:ring-red-500 dark:focus:ring-red-400',
          'text-red-500 focus:text-red-600 dark:text-red-400',
          'bg-white dark:bg-gray-800',
          'border border-red-400 focus:border-red-400 dark:focus:border-red-400',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
      },
    },

    // Primary
    primary: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonRadius,
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonSpacing,
          commonClasses.buttonShadow,
          'focus:ring-primary-500',
          'text-white focus:text-gray-200',
          'bg-primary-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
      },
    },

    // Success
    success: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonRadius,
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonSpacing,
          commonClasses.buttonShadow,
          'focus:ring-green-500',
          'text-white focus:text-gray-200',
          'bg-green-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
      },
    },

    // Transparent
    transparent: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonRadius,
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonSpacing,
          commonClasses.buttonShadow,
          'focus:ring-primary-600',
          'text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white',
          'bg-transparent',
          'border border-gray-300 dark:border-gray-600 dark:focus:border-primary-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
      },
    },
    paginationButton: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonRadius,
          commonClasses.buttonText,
          commonClasses.buttonRing,
          'px-1.5 py-1.5',
          'cursor-pointer relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 dark:bg-gray-800 dark:text-white dark:hover:text-white dark:border-gray-600 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-primary-300 focus:ring-primary-500 active:bg-gray-100 active:text-gray-500',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
      },
    },
    paginationButtonPage: {
      classes: {
        button: mergeClasses(
          'text-sm leading-6 whitespace-nowrap',
          'text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white',
          'border border-gray-300 dark:border-gray-600 dark:focus:border-primary-600',
          '-ml-px',
          'px-3 py-1.5',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
      },
    },
  },
}

export const buttonClassesKeys = Object.keys(buttonConfig.classes)

export declare type ButtonClassesValidKeys = keyof typeof buttonConfig.classes

export declare type ButtonProps = WithVariantPropsAndClassesList<{
  as?: string
  asDeep?: string
  label?: string
  loading?: boolean
  disabled?: boolean | string
  focusOnMount?: boolean
  type?: string
} & InputHTMLAttributes & Data, ButtonClassesValidKeys>

