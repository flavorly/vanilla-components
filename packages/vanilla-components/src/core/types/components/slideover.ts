import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaSlideoverClassesValidKeys } from './config'

export declare type VanillaSlideoverValue = boolean

export declare type VanillaSlideoverProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSlideoverValue
  title?: string
  subtitle?: string
  teleport?: boolean
  teleportTo?: string | HTMLElement
  overlay?: boolean
  closeable?: boolean
  closeableOnClickOutside?: boolean
  closeableOnPressEscape?: boolean
  paddingOnBody?: boolean
  paddingOnContainer?: boolean
  showHeader?: boolean
  as?: string
  position: string | 'left' | 'right'
  size: string | 'default' | 'small' | 'medium' | 'large' | 'full'
} & InputHTMLAttributes & Data, VanillaSlideoverClassesValidKeys>