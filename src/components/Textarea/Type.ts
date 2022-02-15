import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaTextareaValue = string | number | string[] | undefined;

export type VanillaTextareaProps = WithVariantProps<{
  modelValue?: VanillaTextareaValue,
  rows?: string | number,
} & InputHTMLAttributes & Data>;
