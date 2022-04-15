import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaStatusIndicatorClassesValidKeys } from './Config';

export declare type VanillaStatusIndicatorProps = WithVariantPropsAndClassesList<{
  pulse?: boolean,
} & InputHTMLAttributes & Data, VanillaStatusIndicatorClassesValidKeys>;
