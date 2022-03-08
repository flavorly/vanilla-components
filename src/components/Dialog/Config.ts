import { commonClasses } from '@/core/config/commonClasses';
import { mergeClasses } from '@/core';


export const VanillaDialogConfig = {
  fixedClasses: {},
  // Default appearance
  classes: {
    wrapper: 'fixed inset-0 z-10 overflow-y-auto',
    inner: 'min-h-screen px-4 text-center',
    closeButton: 'inline-block h-screen align-middle',
    overlay: 'fixed inset-0 transition-opacity bg-gray-700/50 dark:bg-gray-700/50 backdrop-blur-sm',

    modalWithPadding: 'px-4 pt-5 pb-4 sm:my-8 sm:p-6',
    modal: mergeClasses(
      '',
      'relative inline-block align-bottom sm:align-middle overflow-hidden ',
      'bg-white dark:bg-gray-750',
      'shadow-xl',
      'rounded-lg',
      'max-w-sm w-full sm:max-w-sm sm:w-full',
      'transform transition-all',
      'dark:border dark:border-gray-700',
    ),

    // Body
    bodyWithPadding: 'px-4 py-5',
    body: 'mt-2 text-sm leading-5 text-gray-600 dark:text-gray-300',

    // Footer
    footer: 'px-4 py-5',
    footerDivided: 'border-t border-gray-200 dark:border-gray-700',
    footerWithOneButton: 'sm:grid sm:grid-cols-1 sm:gap-3 sm:grid-flow-row-dense',
    footerWithTwoButtons: 'sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense space-y-2 sm:space-y-0',
    footerWithThreeButtons: 'sm:grid sm:grid-cols-3 sm:gap-3 sm:grid-flow-row-dense',

    // Transition backdrop

    // TODO

    // Transition for Modal

    // TODO
  },
  variants: {
    // fullscreen: {
    //   classes: {
    //     modal: mergeClasses(
    //       'flex flex-col block left-0 top-0 w-full h-full divide-y divide-y-gray-200',
    //     ),
    //   },
    // },
  },
};


export const VanillaDialogClassesKeys = Object.keys(VanillaDialogConfig.classes);

export type VanillaDialogClassesValidKeys = keyof typeof VanillaDialogConfig.classes;


