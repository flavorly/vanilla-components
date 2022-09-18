import type { InputHTMLAttributes } from 'vue'
import type { VanillaCardClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export declare type VanillaCardProps = WithVariantPropsAndClassesList<{
  title?: string
  subtitle?: string
  as?: string
  bodyDivided?: boolean
  bodyDarker?: boolean
  bodyWithPadding?: boolean
  bodyClasses?: string | undefined
} & InputHTMLAttributes & Data, VanillaCardClassesValidKeys>
