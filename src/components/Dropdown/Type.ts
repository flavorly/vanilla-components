import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDropdownClassesValidKeys } from './Config';

export type VanillaDropdownValue = string | number | undefined;

export type VanillaDropdownProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDropdownValue,
} & InputHTMLAttributes & Data, VanillaDropdownClassesValidKeys>;
