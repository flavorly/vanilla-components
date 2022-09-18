import type { InputHTMLAttributes } from 'vue'
import type { VanillaTextareaClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export declare type VanillaTextareaValue = string | number | string[] | undefined

export declare type VanillaTextareaProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaTextareaValue
  rows?: string | number
} & InputHTMLAttributes & Data, VanillaTextareaClassesValidKeys>
