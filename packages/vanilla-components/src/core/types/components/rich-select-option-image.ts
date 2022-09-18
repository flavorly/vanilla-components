import type { InputHTMLAttributes } from 'vue'

import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaRichSelectOptionWithImageClassesValidKeys } from './config'

export declare type VanillaRichSelectOptionWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectOptionWithImageClassesValidKeys>
