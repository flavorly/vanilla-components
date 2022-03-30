import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaInputGroupClassesValidKeys } from './Config';

export declare type VanillaInputGroupValue = string | number | undefined;

export declare type VanillaInputGroupProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaInputGroupValue,
} & InputHTMLAttributes & Data, VanillaInputGroupClassesValidKeys>;
