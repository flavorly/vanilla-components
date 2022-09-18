import type { InputHTMLAttributes } from 'vue'
import type { VanillaStatusIndicatorClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export declare type VanillaStatusIndicatorProps = WithVariantPropsAndClassesList<{
  pulse?: boolean
} & InputHTMLAttributes & Data, VanillaStatusIndicatorClassesValidKeys>
