import type { InputHTMLAttributes } from 'vue'
import { mergeClasses } from '../../core/helpers'
import { commonClasses } from '../../core/config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const buttonConfig = {
  fixedClasses: {
    button: mergeClasses(
      commonClasses.buttonPosition,
      'cursor-pointer',
    ),
    container: 'flex items-center space-x-1',
    spinner: '-ml-1 mr-1 h-4 w-4 text-whit',
    disableOpacity: 'opacity-50',
    enableOpacity: 'opacity-100',
    busyOrInvalidState: 'cursor-not-allowed',

    // Rounded / Radius
    roundedFull: 'rounded-md',
    roundedCircle: 'rounded-full',
    roundedTop: 'rounded-t-md',
    roundedBottom: 'rounded-b-md',
    roundedLeft: 'rounded-l-md',
    roundedRight: 'rounded-r-md',
    roundedBottomLeft: 'rounded-bl-md',
    roundedBottomRight: 'rounded-br-md',
    roundedTopLeft: 'rounded-tl-md',
    roundedTopRight: 'rounded-tr-md',
  },

  // Default Input appearance
  classes: {
    button: mergeClasses(
      commonClasses.buttonText,
      commonClasses.buttonRing,
      commonClasses.buttonSizing,
      commonClasses.buttonShadow,
      'focus:ring-offset-2 focus:ring-primary-600',
      'text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white dark:focus:text-white',
      'bg-white dark:bg-gray-800',
      'border border-gray-300 dark:border-gray-600 dark:focus:border-primary-600',
    ),
    container: ' ',
    spinner: '',
    disableOpacity: '',
    enableOpacity: '',
    busyOrInvalidState: '',
    padding: commonClasses.buttonSpacing,
    paddingCircle: commonClasses.buttonSpacingCircle,

    // Rounded / Radius
    roundedFull: '',
    roundedCircle: '',
    roundedTop: '',
    roundedBottom: '',
    roundedLeft: '',
    roundedRight: '',
    roundedBottomLeft: '',
    roundedBottomRight: '',
    roundedTopLeft: '',
    roundedTopRight: '',
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonShadow,
          'focus:ring-offset-2 focus:ring-red-500',
          'text-white focus:text-gray-200',
          'bg-red-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: commonClasses.buttonSpacing,
        paddingCircle: commonClasses.buttonSpacingCircle,
      },
    },

    // Soft Variant for errors
    error_muted: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonShadow,
          'focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-400',
          'text-red-500 focus:text-red-600 dark:text-red-400',
          'bg-white dark:bg-gray-800',
          'border border-red-400 focus:border-red-400 dark:focus:border-red-400',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: commonClasses.buttonSpacing,
        paddingCircle: commonClasses.buttonSpacingCircle,
      },
    },

    // Primary
    primary: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonShadow,
          'focus:ring-offset-2 focus:ring-primary-500',
          'text-white focus:text-gray-200',
          'bg-primary-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: commonClasses.buttonSpacing,
        paddingCircle: commonClasses.buttonSpacingCircle,
      },
    },

    // Success
    success: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          commonClasses.buttonShadow,
          'focus:ring-offset-2 focus:ring-green-500',
          'text-white focus:text-gray-200',
          'bg-green-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: commonClasses.buttonSpacing,
        paddingCircle: commonClasses.buttonSpacingCircle,
      },
    },

    // Transparent
    outline: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,

          // commonClasses.buttonShadow,
          'focus:ring-offset-2 focus:ring-primary-600',
          'text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white',
          'bg-transparent',
          'border border-gray-400 dark:border-gray-600 dark:focus:border-primary-600',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: commonClasses.buttonSpacing,
        paddingCircle: commonClasses.buttonSpacingCircle,
      },
    },

    // Transparent
    transparent: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          commonClasses.buttonRing,
          commonClasses.buttonSizing,
          'focus:ring-offset-2 focus:ring-primary-600',
          'text-gray-700 focus:text-gray-600 dark:text-white dark:hover:text-white',
          'bg-transparent',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: commonClasses.buttonSpacing,
        paddingCircle: commonClasses.buttonSpacingCircle,
      },
    },

    // Pagination Arrows
    pagination: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'text-sm font-medium text-gray-500 dark:text-white hover:text-gray-400 dark:hover:text-gray-100',
          'px-3 py-2',
          'cursor-pointer relative inline-flex items-center bg-white dark:bg-gray-800',
          'border-0',
          'ring-1 ring-inset ring-gray-300 dark:ring-gray-600/60',
          'focus:z-10 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500',
          '-ml-px',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: '',
        paddingCircle: commonClasses.buttonSpacingCircle,
      },
    },

    // Pagination Page
    pagination_page: {
      classes: {
        button: mergeClasses(
          commonClasses.buttonText,
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'text-sm font-medium text-gray-500 dark:text-white',
          'px-3 py-2',
          'cursor-pointer relative inline-flex items-center',
          'border-0',
          'bg-white dark:bg-gray-800',
          'ring-1 ring-inset ring-gray-300 dark:ring-gray-600/60',
          'focus:z-10 focus:outline-none focus:ring-offset-0 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-500',
          '-ml-px',
        ),
        container: '',
        spinner: '',
        disableOpacity: '',
        enableOpacity: '',
        busyOrInvalidState: '',
        padding: '',
        paddingCircle: commonClasses.buttonSpacingCircle,
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

