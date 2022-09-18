import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaCardClassesValidKeys } from './config'

export declare type VanillaCardProps = WithVariantPropsAndClassesList<{
  title?: string
  subtitle?: string
  as?: string
  bodyDivided?: boolean
  bodyDarker?: boolean
  bodyWithPadding?: boolean
  bodyClasses?: string | undefined
} & InputHTMLAttributes & Data, VanillaCardClassesValidKeys>
