import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaCardClassesValidKeys } from './Config';

export type VanillaCardProps = WithVariantPropsAndClassesList<{
  title?: string,
  rows?: string | number,
} & InputHTMLAttributes & Data, VanillaCardClassesValidKeys>;
