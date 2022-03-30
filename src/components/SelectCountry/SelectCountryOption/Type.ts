import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export declare type VanillaSelectCountryOptionProps = WithVariantProps<{
  country?: object,
  selected?: boolean,
  description?: string | undefined,
  hasErrors?: boolean,
  parentClasses?: string[] | string
  labelWithDialCode?: boolean,
  labelWithCountryCode?: boolean
} & InputHTMLAttributes & Data>;
