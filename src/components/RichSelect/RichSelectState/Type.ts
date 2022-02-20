import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaRichSelectStateClassesValidKeys  } from './Config';

export type VanillaRichSelectStateProps = WithVariantPropsAndClassesList<{
} & InputHTMLAttributes & Data, VanillaRichSelectStateClassesValidKeys>;
