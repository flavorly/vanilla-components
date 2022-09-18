import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaRichSelectTagWithImageClassesValidKeys } from './config'

export declare type VanillaRichSelectTagWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectTagWithImageClassesValidKeys >
