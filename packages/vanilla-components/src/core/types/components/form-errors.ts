import type { InputHTMLAttributes } from 'vue'
import type { Data, Errors, WithVariantProps } from '../index'

export declare type VanillaFormErrorsProps = WithVariantProps<{
  errors?: Errors
  safe?: boolean
} & InputHTMLAttributes & Data>
