import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDatetimePickerClassesValidKeys } from './Config';

export declare type VanillaDatetimePickerValue = string | undefined;

export declare type VanillaDatetimePickerProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDatetimePickerValue,
  type?: string,
  options?: object
} & InputHTMLAttributes & Data, VanillaDatetimePickerClassesValidKeys>;
