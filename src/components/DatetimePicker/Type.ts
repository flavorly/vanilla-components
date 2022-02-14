import { Data, WithVariantProps } from '@/core/types';
import { InputHTMLAttributes } from 'vue';

export type VanillaDatetimePickerValue = string | undefined;

export type VanillaDatetimePickerProps = WithVariantProps<{
  modelValue?: VanillaDatetimePickerValue,
  type?: string,
  options?: object
} & InputHTMLAttributes & Data>;
