import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaRichSelectStateClassesValidKeys  } from './Config';

export declare type VanillaRichSelectStateProps = WithVariantPropsAndClassesList<{
  something?: string
} & InputHTMLAttributes & Data, VanillaRichSelectStateClassesValidKeys>;
