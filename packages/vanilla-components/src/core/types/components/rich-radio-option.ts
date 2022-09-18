import type { InputHTMLAttributes } from 'vue'

import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaRichRadioOptionClassesValidKeys } from './config'

export declare type VanillaRichRadioOptionProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichRadioOptionClassesValidKeys>
