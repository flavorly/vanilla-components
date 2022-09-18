import type { InputHTMLAttributes } from 'vue'
import type { VanillaSelectClassesValidKeys } from './Config'
import type { Data, InputOptions, NormalizedOption, NormalizedOptions, WithVariantPropsAndClassesList } from '../../core/types'

export declare type VanillaSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | VanillaSelectValue[]

export declare type VanillaSelectProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectValue
  options?: InputOptions | NormalizedOption[] | NormalizedOptions
  multiple?: boolean
  normalizeOptions?: boolean
  valueAttribute?: string
  textAttribute?: string
  disabled?: boolean
} & InputHTMLAttributes & Data, VanillaSelectClassesValidKeys>
