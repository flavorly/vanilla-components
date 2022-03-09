import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

import { VanillaRichRadioOptionClassesValidKeys } from './Config';

export type VanillaRichRadioOptionProps = WithVariantPropsAndClassesList<{
  name?: string | undefined,
  image?: string | undefined,
  selected?: boolean,
  description?: string | undefined,
  hasErrors?: boolean,
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichRadioOptionClassesValidKeys>;
