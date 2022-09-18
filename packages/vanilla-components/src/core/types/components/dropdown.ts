import type { InputHTMLAttributes } from 'vue'
import type { Options, Placement } from '@popperjs/core'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaDropdownClassesValidKeys } from './config'

export declare type VanillaDropdownValue = boolean

export declare type VanillaDropdownProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDropdownValue
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
  usePopper: boolean
  overlay?: boolean
  spacedItems?: boolean
  showArrow?: boolean
  size?: string | undefined | 'default' | 'medium' | 'large' | 'extra-large' | 'super-large' | 'full-width'
  position?: string | undefined | 'center' | 'left' | 'right' | 'full-width'
} & InputHTMLAttributes & Data, VanillaDropdownClassesValidKeys>

export type VanillaDropdownExtendedProps = WithVariantPropsAndClassesList<{
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
} & InputHTMLAttributes & Data, VanillaDropdownClassesValidKeys>
