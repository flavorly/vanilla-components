import type { InputHTMLAttributes } from 'vue'
import { inputConfig } from '@/components/input/config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const textareaConfig = inputConfig

export const textareaClassesKeys = Object.keys(textareaConfig.classes)

export declare type TextareaClassesValidKeys = keyof typeof textareaConfig.classes

export declare type TextareaValue = string | number | string[] | undefined

export declare type TextareaProps = WithVariantPropsAndClassesList<{
  modelValue?: TextareaValue
  rows?: string | number
  placeholder?: string
  copiable?: boolean
} & InputHTMLAttributes & Data, TextareaClassesValidKeys>

