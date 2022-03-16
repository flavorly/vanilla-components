import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaInputClassesValidKeys } from './Config';

export type VanillaInputValue = string | number | undefined;

export type VanillaInputProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaInputValue,
  type?: string,
  placeholder?: string,
} & InputHTMLAttributes & Data, VanillaInputClassesValidKeys>;
