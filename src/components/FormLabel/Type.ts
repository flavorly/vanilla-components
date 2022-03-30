import { Data, WithVariantProps, Errors } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export declare type VanillaFormLabelProps = WithVariantProps<{
  errors?: Errors,
  safe?: boolean,
} & InputHTMLAttributes & Data>;
