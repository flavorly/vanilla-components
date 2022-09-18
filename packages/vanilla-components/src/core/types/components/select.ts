import type { InputHTMLAttributes } from 'vue'
import type { Data, InputOptions, NormalizedOption, NormalizedOptions, WithVariantPropsAndClassesList } from '../index'
import type { VanillaSelectClassesValidKeys } from './config'

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
