import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaRichSelectOptionWithIndicatorsClassesValidKeys } from './Config';

export declare type VanillaRichSelectOptionWithIndicatorsProps = WithVariantPropsAndClassesList<{
  name?: string | undefined,
  status?: string | undefined,
  selected?: boolean,
  description?: string | undefined,
  hasErrors?: boolean,
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, VanillaRichSelectOptionWithIndicatorsClassesValidKeys >;
