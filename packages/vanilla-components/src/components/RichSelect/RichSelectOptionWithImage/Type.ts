import type { InputHTMLAttributes } from 'vue'

import type { VanillaRichSelectOptionWithImageClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../../core/types'

export declare type VanillaRichSelectOptionWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectOptionWithImageClassesValidKeys>
