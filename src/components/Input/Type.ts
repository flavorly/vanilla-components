import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VCInputValue = string | number | string[] | undefined;

//  Should be VanillaComponentProps
export type VCInputOptions = WithVariantProps<{
  modelValue?: VCInputValue,
} & InputHTMLAttributes & Data>;
