import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaInputGroupClassesValidKeys } from './Config';

export type VanillaInputGroupValue = string | number | undefined;

export type VanillaInputGroupProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaInputGroupValue,
} & InputHTMLAttributes & Data, VanillaInputGroupClassesValidKeys>;
