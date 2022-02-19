import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaInputValue = string | number | undefined;

export type VanillaInputProps = WithVariantProps<{
  modelValue?: VanillaInputValue,
  rows?: string | number,
} & InputHTMLAttributes & Data>;
