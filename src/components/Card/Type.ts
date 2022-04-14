import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaCardClassesValidKeys } from './Config';

export declare type VanillaCardProps = WithVariantPropsAndClassesList<{
  title?: string,
  subtitle?: string,
  as?: string,
  bodyDivided?: boolean,
  bodyDarker?: boolean,
  bodyWithPadding?: boolean,
  bodyClasses?: string | undefined,
} & InputHTMLAttributes & Data, VanillaCardClassesValidKeys>;
