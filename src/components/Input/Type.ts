import { Data, WithVariantProps } from '@/core';
import { InputHTMLAttributes } from 'vue';

export type VCInputValue = string | number | string[] | undefined;

export type VCInputOptions = WithVariantProps<{
  modelValue?: VCInputValue,
} & InputHTMLAttributes & Data>;
