import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaRichSelectTagWithImageClassesValidKeys } from './Config';

export type VanillaRichSelectTagWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined,
  image?: string | undefined,
  selected?: boolean,
  description?: string | undefined,
  hasErrors?: boolean,
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectTagWithImageClassesValidKeys >;
