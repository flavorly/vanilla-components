import type { InputHTMLAttributes } from 'vue'
import type { VanillaRichSelectTagWithImageClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export declare type VanillaRichSelectTagWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectTagWithImageClassesValidKeys >
