import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaInputValue = string | number | string[] | undefined;

//  Should be VanillaComponentProps
export type VanillaInputProps = WithVariantProps<{
  modelValue?: VanillaInputValue,
  type?: string,
} & InputHTMLAttributes & Data>;
