import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaInputClassesValidKeys } from './config'

export declare type VanillaInputValue = string | number | undefined

export declare type VanillaInputProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaInputValue
  type?: string
  placeholder?: string
} & InputHTMLAttributes & Data, VanillaInputClassesValidKeys>
