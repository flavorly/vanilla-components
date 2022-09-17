import type { InputHTMLAttributes } from 'vue'

import type { VanillaRichRadioOptionClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export declare type VanillaRichRadioOptionProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichRadioOptionClassesValidKeys>
