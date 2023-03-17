import type { InputHTMLAttributes } from 'vue'
import { mergeClasses } from '../../core/helpers'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const dialogConfig = {
  fixedClasses: {
  },

  // Default appearance
  classes: {

    wrapper: 'fixed inset-0 overflow-y-auto',

    inner: 'flex min-h-full p-4 justify-center text-center sm:p-0',
    positionCentered: 'items-center',
    positionCenterBottom: 'items-end sm:items-center',
    positionCenterTop: 'items-start sm:items-center',
    positionBottom: 'items-end',
    positionTop: 'items-start',

    overlay: 'fixed inset-0 transition-opacity  backdrop-blur-sm',
    overlayColor: 'bg-gray-600/50 dark:bg-gray-900/80',

    modalBackground: 'bg-white dark:bg-gray-800',
    modalRing: 'ring-1 ring-gray-500/20 dark:ring-gray-200/20',
    modal: mergeClasses(
      'sm:my-8',
      'relative inline-block align-middle overflow-hidden',
      'shadow-xl',
      'rounded-lg',
      'transform transition-all',
    ),

    modalPaddingX: 'px-5',
    modalPaddingTop: 'pt-5',
    modalPaddingBottom: 'pb-4',

    zIndexWrapper: 'z-[40]',
    zIndexOverlay: 'z-[30]',

    sizeDefault: 'max-w-sm w-full sm:max-w-sm sm:w-full',
    sizeSmall: 'max-w-xs w-full sm:max-w-xs sm:w-full',
    sizeMedium: 'max-w-md w-full sm:max-w-md sm:w-full',
    sizeLarge: 'max-w-lg w-full sm:max-w-lg sm:w-full',
    sizeFull: ' w-full',

    // Body
    // body: 'text-sm leading-5 text-gray-600 dark:text-gray-300',
    body: '',

    // bodyWithPadding: 'px-4 sm:px-8 py-4 sm:py-8',
    bodyPaddingX: 'px-4',
    bodyPaddingBottom: 'pb-4',
    bodyPaddingTop: 'pt-5',

    // Header / Title
    title: 'px-4 py-4 sm:px-6 text-gray-700',
    titleDivided: 'border-b dark:border-gray-700',
    titleText: 'text-lg leading-6 font-medium text-gray-900 dark:text-white',

    // Footer
    footer: 'px-4 py-4',
    footerDivided: 'border-t border-gray-200 dark:border-gray-700',
    footerWithOneButton: 'grid grid-cols-1',
    footerWithTwoButtons: 'grid gap-y-2 grid-cols-1 sm:grid-cols-2 sm:gap-x-2 sm:gap-y-0 xs:grid-cols-2 xs:grid-flow-row-dense xs:gap-x-2 xs:gap-y-0',
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

export const dialogClassesKeys = Object.keys(dialogConfig.classes)

export declare type DialogClassesValidKeys = keyof typeof dialogConfig.classes
export declare type DialogValue = boolean

export declare type DialogProps = WithVariantPropsAndClassesList<{
  modelValue?: DialogValue
  title?: string
  teleport?: boolean
  teleportTo?: string | HTMLElement
  overlay?: boolean
  closeable?: boolean
  closeableOnClickOutside?: boolean
  closeableOnPressEscape?: boolean
  paddingOnModal?: boolean
  bodyDivided?: boolean
  bodyDarker?: boolean
  bodyWithPadding?: boolean
  bodyClasses?: boolean
  divided?: boolean
  as?: string
  size?: 'default' | 'small' | 'medium' | 'large' | 'full'
} & InputHTMLAttributes & Data, DialogClassesValidKeys>
