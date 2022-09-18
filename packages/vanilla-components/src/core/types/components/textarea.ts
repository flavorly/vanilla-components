import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaTextareaClassesValidKeys } from './config'

export declare type VanillaTextareaValue = string | number | string[] | undefined

export declare type VanillaTextareaProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaTextareaValue
  rows?: string | number
} & InputHTMLAttributes & Data, VanillaTextareaClassesValidKeys>
