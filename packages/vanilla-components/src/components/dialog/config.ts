import { mergeClasses } from '../../core'

export const VanillaDialogConfig = {
  fixedClasses: {},

  // Default appearance
  classes: {
    wrapper: 'fixed inset-0 z-30 overflow-y-auto',
    inner: 'min-h-screen px-4 text-center',
    closeButton: 'inline-block h-screen align-middle',
    overlay: 'fixed inset-0 transition-opacity bg-gray-700/50 dark:bg-gray-900/80 backdrop-blur-sm',

    modalWithPadding: 'px-4 pt-5 pb-4 sm:my-8 sm:p-6',

    modal: mergeClasses(
      '',
      'relative inline-block align-middle overflow-hidden',
      'bg-white dark:bg-gray-800/70',
      'shadow-xl',
      'rounded-lg',
      'transform transition-all',
      'dark:border dark:border-gray-700',
    ),

    sizeDefault: 'max-w-sm w-full sm:max-w-sm sm:w-full',
    sizeSmall: 'max-w-xs w-full sm:max-w-xs sm:w-full',
    sizeMedium: 'max-w-md w-full sm:max-w-md sm:w-full',
    sizeLarge: 'max-w-lg w-full sm:max-w-lg sm:w-full',
    sizeFull: ' w-full',

    // Header / Title
    title: 'px-4 py-5 sm:px-6 text-gray-700',
    titleDivided: 'border-b dark:border-gray-700',
    titleText: 'text-lg leading-6 font-medium text-gray-900 dark:text-white',

    // Body
    body: 'mt-2 text-sm leading-5 text-gray-600 dark:text-gray-300',
    bodyDivided: 'sm:divide-y sm:divide-gray-200 dark:divide-gray-800',
    bodyDarker: 'bg-gray-50 dark:bg-gray-800',

    // bodyWithPadding: 'px-4 sm:px-8 py-4 sm:py-8',
    bodyWithPadding: 'px-4',
    bodyWithPaddingBottom: 'pb-4',
    bodyWithPaddingTop: 'pt-5',

    // Footer
    footer: 'px-4 py-5',
    footerDivided: 'border-t border-gray-200 dark:border-gray-700',
    footerWithOneButton: 'sm:grid sm:grid-cols-1 sm:gap-2 sm:grid-flow-row-dense',
    footerWithTwoButtons: 'sm:grid sm:grid-cols-2 sm:gap-2 sm:grid-flow-row-dense space-y-2 sm:space-y-0',
    footerWithThreeButtons: 'sm:grid sm:grid-cols-3 sm:gap-2 sm:grid-flow-row-dense',

    // Transition backdrop
    overlayEnter: 'duration-300 ease-out',
    overlayEnterFrom: 'opacity-0',
    overlayEnterTo: 'opacity-100',
    overlayLeave: 'duration-200 ease-in',
    overlayLeaveFrom: 'opacity-100',
    overlayLeaveTo: 'opacity-0',

    // Transition for Modal
    dialogEnter: 'duration-300 ease-out',
    dialogEnterFrom: 'opacity-0 scale-95',
    dialogEnterTo: 'opacity-100 scale-100',
    dialogLeave: 'duration-200 ease-in',
    dialogLeaveFrom: 'opacity-100 scale-100',
    dialogLeaveTo: 'opacity-0 scale-95',
  },
}

export const VanillaDialogClassesKeys = Object.keys(VanillaDialogConfig.classes)

export type VanillaDialogClassesValidKeys = keyof typeof VanillaDialogConfig.classes

