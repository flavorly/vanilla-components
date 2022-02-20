import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDatetimePickerClassesValidKeys } from './Config';

export type VanillaDatetimePickerValue = string | undefined;

export type VanillaDatetimePickerProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDatetimePickerValue,
  type?: string,
  options?: object
} & InputHTMLAttributes & Data, VanillaDatetimePickerClassesValidKeys>;
