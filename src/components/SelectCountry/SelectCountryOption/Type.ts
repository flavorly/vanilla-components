import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaCountryOptionProps = WithVariantProps<{
  country?: object,
  selected?: boolean,
  description?: string | undefined,
  hasErrors?: boolean,
  parentClasses?: string[] | string
  labelWithDialCode?: boolean,
  labelWithCountryCode?: boolean
} & InputHTMLAttributes & Data>;
