import type { InputHTMLAttributes } from 'vue'
import type { VanillaInputClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export declare type VanillaInputValue = string | number | undefined

export declare type VanillaInputProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaInputValue
  type?: string
  placeholder?: string
} & InputHTMLAttributes & Data, VanillaInputClassesValidKeys>
