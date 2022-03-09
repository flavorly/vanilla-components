import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

import { VanillaRichSelectOptionWithImageClassesValidKeys } from './Config';

export type VanillaRichSelectOptionWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined,
  image?: string | undefined,
  selected?: boolean,
  description?: string | undefined,
  hasErrors?: boolean,
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectOptionWithImageClassesValidKeys>;
