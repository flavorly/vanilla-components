import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaStatusIndicatorClassesValidKeys } from './config'

export declare type VanillaStatusIndicatorProps = WithVariantPropsAndClassesList<{
  pulse?: boolean
} & InputHTMLAttributes & Data, VanillaStatusIndicatorClassesValidKeys>
