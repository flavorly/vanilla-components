import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaDatetimePickerClassesValidKeys } from './config'

export declare type VanillaDatetimePickerValue = string | undefined

export declare type VanillaDatetimePickerProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDatetimePickerValue
  type?: string
  options?: object
} & InputHTMLAttributes & Data, VanillaDatetimePickerClassesValidKeys>
