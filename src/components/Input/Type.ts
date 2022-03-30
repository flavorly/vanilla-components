import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaInputClassesValidKeys } from './Config';

export declare type VanillaInputValue = string | number | undefined;

export declare type VanillaInputProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaInputValue,
  type?: string,
  placeholder?: string,
} & InputHTMLAttributes & Data, VanillaInputClassesValidKeys>;
