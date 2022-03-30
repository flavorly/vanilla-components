import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaTextareaClassesValidKeys } from './Config';

export declare type VanillaTextareaValue = string | number | string[] | undefined;

export declare type VanillaTextareaProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaTextareaValue,
  rows?: string | number,
} & InputHTMLAttributes & Data, VanillaTextareaClassesValidKeys>;
