import type { InputHTMLAttributes } from 'vue'
import type { Data, Errors, WithVariantProps } from '@/core/types'

export declare type VanillaFormLabelProps = WithVariantProps<{
  errors?: Errors
  safe?: boolean
} & InputHTMLAttributes & Data>
