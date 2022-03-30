import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaCardClassesValidKeys } from './Config';

export declare type VanillaCardProps = WithVariantPropsAndClassesList<{
  title?: string,
  rows?: string | number,
} & InputHTMLAttributes & Data, VanillaCardClassesValidKeys>;
