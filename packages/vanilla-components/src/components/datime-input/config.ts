import type { InputHTMLAttributes } from 'vue'
import { inputConfig } from '../input/config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const dateTimeInputConfig = inputConfig
export const dateTimeInputClassesKeys = Object.keys(dateTimeInputConfig.classes)

export declare type DateTimeInputValue = string | undefined
export declare type DateTimeInputClassesValidKeys = keyof typeof dateTimeInputConfig.classes
export declare type DateTimeInputProps = WithVariantPropsAndClassesList<{
  modelValue?: DateTimeInputValue
  type?: string
  options?: object
} & InputHTMLAttributes & Data, DateTimeInputClassesValidKeys>

