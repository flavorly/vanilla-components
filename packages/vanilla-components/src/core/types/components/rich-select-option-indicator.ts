import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaRichSelectOptionWithIndicatorsClassesValidKeys } from './config'

export declare type VanillaRichSelectOptionWithIndicatorsProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  status?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectOptionWithIndicatorsClassesValidKeys >
