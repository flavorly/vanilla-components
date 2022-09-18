import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantProps } from '../../../core/types'

export declare type VanillaSelectCountryOptionProps = WithVariantProps<{
  country?: object
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
  labelWithDialCode?: boolean
  labelWithCountryCode?: boolean
} & InputHTMLAttributes & Data>
