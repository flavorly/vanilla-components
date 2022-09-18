import type { InputHTMLAttributes } from 'vue'
import type { VanillaRichSelectOptionWithIndicatorsClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../../core/types'

export declare type VanillaRichSelectOptionWithIndicatorsProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  status?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectOptionWithIndicatorsClassesValidKeys >
