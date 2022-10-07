import type { Options, Placement } from '@popperjs/core'
import type { InputHTMLAttributes } from 'vue'
import { commonClasses, popperOptions } from '@/core/config'
import { mergeClasses } from '@/core/helpers'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const dropdownConfig = {
  fixedClasses: {
    // roundedFull: commonClasses.inputsRadius,
    // roundedTop: commonClasses.inputsRadiusTop,
    // roundedBottom: commonClasses.inputsRadiusBottom,
    // roundedLeft: commonClasses.inputsRadiusLeft,
    // roundedRight: commonClasses.inputsRadiusRight,
    // roundedBottomLeft: commonClasses.inputsRadiusBottomLeft,
    // roundedBottomRight: commonClasses.inputsRadiusBottomRight,
    // roundedTopLeft: commonClasses.inputsRadiusTopLeft,
    // roundedTopRight: commonClasses.inputsRadiusTopRight,
  },

  // Default appearance
  classes: {
    trigger: '',
    wrapper: 'relative',
    container: 'flex items-center content-center',

    // container: 'inline-flex items-center content-center',
    chevronIcon: '-mr-1 ml-2 h-4 w-4',
    overlay: 'fixed top-0 right-0 left-0 bottom-0 z-[99] bg-black/50',

    menuWrapper: 'absolute z-[100]',

    // Wrapper when no popper is used
    menuWrapperLeft: 'absolute origin-top-left left-0',
    menuWrapperRight: 'absolute origin-top-right right-0',
    menuWrapperCenter: 'absolute origin-top-right right-0 left-0 sm:left-auto sm:w-sm',
    menuWrapperCenterFull: 'absolute origin-top-right right-0 mx-4 left-0 sm:left-auto sm:w-sm',

    dropdown: mergeClasses(
      commonClasses.dropdownsBackground,
      commonClasses.dropdownsBorder,
      commonClasses.dropdownsRadius,
      commonClasses.dropdownsShadows,
      'top-5',
      'focus:ring-0 focus:outline-none',
      'overflow-hidden',
    ),

    roundedFull: commonClasses.inputsRadius,
    roundedTop: commonClasses.inputsRadiusTop,
    roundedBottom: commonClasses.inputsRadiusBottom,
    roundedLeft: commonClasses.inputsRadiusLeft,
    roundedRight: commonClasses.inputsRadiusRight,
    roundedBottomLeft: commonClasses.inputsRadiusBottomLeft,
    roundedBottomRight: commonClasses.inputsRadiusBottomRight,
    roundedTopLeft: commonClasses.inputsRadiusTopLeft,
    roundedTopRight: commonClasses.inputsRadiusTopRight,

    sizeDefault: 'w-56',
    sizeMedium: 'w-64',
    sizeLarge: 'w-72',
    sizeXLarge: 'w-80',
    sizeXXLarge: 'w-96',
    sizeFull: 'w-full',

    menuItemsWrapper: '',
    menuItemsWrapperSpaced: 'space-y-1',

    menuItem: 'group flex items-center w-full  text-sm leading-5 space-x-1 cursor-pointer',
    menuItemHighlighted: 'text-primary-900 bg-primary-100 dark:bg-primary-300 dark:text-black z-10',
    menuItemNotHighlighted: 'text-gray-700 dark:text-white',
    menuItemSpacing: 'px-3 py-2',

    arrow: 'top-[-5px] invisible -z-[1] before:border-b-0 before:border-r-0 before:absolute before:w-2 before:h-2 before:bg-white  before:dark:bg-gray-900 before:visible before:rotate-45 before:border before:border-1 before:border-gray-300 before:dark:border-gray-700 before:rounded-sm',

    // Transitions
    enterActiveClass: 'transition duration-100 ease-out',
    enterFromClass: 'transform scale-95 opacity-0',
    enterToClass: 'transform scale-100 opacity-100',
    leaveActiveClass: 'transition duration-75 ease-in',
    leaveFromClass: 'transform scale-100 opacity-100',
    leaveToClass: 'transform scale-95 opacity-0',
  },
}

export const dropdownPopperDefaultOptions = popperOptions
export const dropdownClassesKeys = Object.keys(dropdownConfig.classes)
export const validDropdownPlacements = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'right',
  'right-start',
  'right-end',
  'left',
  'left-start',
  'left-end',
]

export declare type DropdownClassesValidKeys = keyof typeof dropdownConfig.classes
export declare type DropdownValue = boolean

export declare type DropdownProps = WithVariantPropsAndClassesList<{
  modelValue?: DropdownValue
  text?: string
  buttonVariant?: string
  teleport?: boolean
  teleportTo?: string | HTMLElement
  tagName?: string
  dropdownTagName?: string
  disabled?: boolean
  toggleOnFocus?: boolean
  toggleOnClick?: boolean
  toggleOnHover?: boolean
  placement?: Placement | string
  popperOptions?: Options
  usePopper?: boolean
  overlay?: boolean
  spacedItems?: boolean
  showArrow?: boolean
  size?: string | undefined | 'default' | 'medium' | 'large' | 'extra-large' | 'super-large' | 'full-width'
  position?: string | undefined | 'center' | 'left' | 'right' | 'full-width'
} & InputHTMLAttributes & Data, DropdownClassesValidKeys>

export declare type DropdownExtendedProps = WithVariantPropsAndClassesList<{
  text?: string
  disabled?: boolean

  tagName?: string
  dropdownTagName?: string
  dropdownAttributes?: Data

  toggleOnFocus?: boolean
  toggleOnClick?: boolean
  toggleOnHover?: boolean

  show?: boolean

  hideOnLeaveTimeout?: number

  teleport?: boolean
  teleportTo?: string | HTMLElement

  placement?: Placement
  popperOptions?: Options
} & InputHTMLAttributes & Data, DropdownClassesValidKeys>

