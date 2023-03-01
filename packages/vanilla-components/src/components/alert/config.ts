import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const alertConfig = {
  fixedClasses: {
    wrapper: '',
    iconWrapper: 'flex-shrink-0',
    icon: 'h-5 w-5',
    contentWrapper: 'ml-3 flex flex-col space-y-2',
    title: 'text-sm font-medium',
    text: 'text-sm',
    actionsWrapper: 'mt-4',
    actionsContainer: '-mx-2 -my-1.5 flex',
    closeButtonWrapper: 'ml-auto pl-3',
    closeButtonContainer: '-mx-1.5 -my-1.5',
    closeButton: 'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
    closeButtonIcon: 'h-5 w-5',

    enterActiveClass: 'transition duration-100 ease-out',
    enterFromClass: 'transform scale-95 opacity-0',
    enterToClass: 'transform scale-100 opacity-100',
    leaveActiveClass: 'transition duration-75 ease-in',
    leaveFromClass: 'transform scale-100 opacity-100',
    leaveToClass: 'transform scale-95 opacity-0',
  },

  classes: {
    wrapper: 'border-l-4 rounded-md p-4 border-primary-400 bg-white dark:bg-gray-800/70',
    iconWrapper: '',
    icon: '',
    contentWrapper: '',
    title: 'text-gray-800 dark:text-white',
    text: 'text-gray-700 dark:text-gray-50',
    actionsWrapper: '',
    actionsContainer: '',
    closeButtonWrapper: '',
    closeButtonContainer: '',
    closeButton: 'bg-transparent text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-primary-600 focus:ring-offset-white dark:focus:ring-offset-gray-800',
    closeButtonIcon: '',

    // Transitions
    enterActiveClass: '',
    enterFromClass: '',
    enterToClass: '',
    leaveActiveClass: '',
    leaveFromClass: '',
    leaveToClass: '',
  },

  variants: {
    success: {
      classes: {
        wrapper: 'border-l-4 rounded-md p-4 border-green-400 dark:border-green-600 bg-green-50 dark:bg-green-200',
        iconWrapper: '',
        icon: 'text-green-400 dark:text-green-600',
        contentWrapper: '',
        title: 'text-green-800 dark:text-green-900',
        text: 'text-green-700 dark:text-green-900/90',
        actionsWrapper: '',
        actionsContainer: '',
        closeButtonWrapper: '',
        closeButtonContainer: '',
        closeButton: 'bg-green-50 dark:bg-green-200 text-green-500 dark:text-green-700 hover:bg-green-100 dark:hover:bg-green-300 focus:ring-green-600 dark:focus:ring-green-800 focus:ring-offset-green-50 dark:focus:ring-offset-green-200',
        closeButtonIcon: '',
      },
    },
    warning: {
      classes: {
        wrapper: 'border-l-4 rounded-md p-4 border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-200',
        iconWrapper: '',
        icon: 'text-yellow-400 dark:text-yellow-600',
        contentWrapper: '',
        title: 'text-yellow-800 dark:text-yellow-900',
        text: 'text-yellow-700 dark:text-yellow-900/90',
        actionsWrapper: '',
        actionsContainer: '',
        closeButtonWrapper: '',
        closeButtonContainer: '',
        closeButton: 'bg-yellow-50 dark:bg-yellow-200 text-yellow-500 dark:text-yellow-700 hover:bg-yellow-100 dark:hover:bg-yellow-300 focus:ring-yellow-600 dark:focus:ring-yellow-800 focus:ring-offset-yellow-50 dark:focus:ring-offset-yellow-200',
        closeButtonIcon: '',
      },
    },
    error: {
      classes: {
        wrapper: 'border-l-4 rounded-md p-4 border-red-400 dark:border-red-600 bg-red-50 dark:bg-red-200',
        iconWrapper: '',
        icon: 'text-red-400 dark:text-red-600',
        contentWrapper: '',
        title: 'text-red-800 dark:text-red-900',
        text: 'text-red-700 dark:text-red-900/90',
        actionsWrapper: '',
        actionsContainer: '',
        closeButtonWrapper: '',
        closeButtonContainer: '',
        closeButton: 'bg-red-50 dark:bg-red-200 text-red-500 dark:text-red-700 hover:bg-red-100 dark:hover:bg-red-300 focus:ring-red-600 dark:focus:ring-red-800 focus:ring-offset-red-50 dark:focus:ring-offset-red-200',
        closeButtonIcon: '',
      },
    },
    info: {
      classes: {
        wrapper: 'border-l-4 rounded-md p-4 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-200',
        iconWrapper: '',
        icon: 'text-blue-400 dark:text-blue-600',
        contentWrapper: '',
        title: 'text-blue-800 dark:text-blue-900',
        text: 'text-blue-700 dark:text-blue-900/90',
        actionsWrapper: '',
        actionsContainer: '',
        closeButtonWrapper: '',
        closeButtonContainer: '',
        closeButton: 'bg-blue-50 dark:bg-blue-200 text-blue-500 dark:text-blue-700 hover:bg-blue-100 dark:hover:bg-blue-300 focus:ring-blue-600 dark:focus:ring-blue-800 focus:ring-offset-blue-50 dark:focus:ring-offset-blue-200',
        closeButtonIcon: '',
      },
    },
    muted: {
      classes: {
        wrapper: 'ring-1 ring-inset rounded-md p-4 ring-primary-400/50 bg-primary-300/10 dark:bg-primary-600/10',
        iconWrapper: '',
        icon: '',
        contentWrapper: '',
        title: 'font-semibold  text-primary-800 dark:text-primary-400',
        text: 'text-primary-700 dark:text-primary-200',
        actionsWrapper: '',
        actionsContainer: '',
        closeButtonWrapper: '',
        closeButtonContainer: '',
        closeButton: 'bg-transparent text-primary-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-primary-600 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        closeButtonIcon: '',
      },
    },
    warning_muted: {
      classes: {
        wrapper: 'ring-1 ring-inset rounded-md p-4 ring-yellow-400/50 bg-yellow-300/10 dark:bg-yellow-600/10',
        iconWrapper: '',
        icon: '',
        contentWrapper: '',
        title: 'text-yellow-800 dark:text-yellow-400',
        text: 'text-yellow-700 dark:text-yellow-200',
        actionsWrapper: '',
        actionsContainer: '',
        closeButtonWrapper: '',
        closeButtonContainer: '',
        closeButton: 'bg-transparent text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-primary-600 focus:ring-offset-white dark:focus:ring-offset-gray-800',
        closeButtonIcon: '',
      },
    },
  },
}

export const alertClassesKeys = Object.keys(alertConfig.classes)

export declare type AlertClassesValidKeys = keyof typeof alertConfig.classes

export declare type AlertProps = WithVariantPropsAndClassesList<{
  title?: string
  subtitle?: string
  closable?: boolean
  closeAfter?: number
} & InputHTMLAttributes & Data, AlertClassesValidKeys>
