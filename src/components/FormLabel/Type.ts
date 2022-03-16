import { Data, WithVariantProps, Errors } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaFormErrorsProps = WithVariantProps<{
  errors?: Errors,
  safe?: boolean,
} & InputHTMLAttributes & Data>;
