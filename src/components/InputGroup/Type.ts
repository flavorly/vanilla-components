import type { InputHTMLAttributes } from 'vue'
import type { VanillaInputGroupClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export declare type VanillaInputGroupValue = string | number | undefined

export declare type VanillaInputGroupProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaInputGroupValue
} & InputHTMLAttributes & Data, VanillaInputGroupClassesValidKeys>
