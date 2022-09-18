import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantProps } from '../../core/types'

export declare type VanillaFormFeedbackProps = WithVariantProps<{
  text?: string | undefined
  safe?: boolean
} & InputHTMLAttributes & Data>
