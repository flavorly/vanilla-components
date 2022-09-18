import type { InputHTMLAttributes } from 'vue'
import type { VanillaDatetimePickerClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export declare type VanillaDatetimePickerValue = string | undefined

export declare type VanillaDatetimePickerProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDatetimePickerValue
  type?: string
  options?: object
} & InputHTMLAttributes & Data, VanillaDatetimePickerClassesValidKeys>
