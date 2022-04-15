import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDialogClassesValidKeys } from './Config';

export declare type VanillaDialogValue = boolean;

export declare type VanillaDialogProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDialogValue,
  title?: string,
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
  overlay?: boolean,
  closeable?: boolean,
  closeableOnClickOutside?: boolean,
  closeableOnPressEscape?: boolean,
  paddingOnModal?: boolean,
  bodyDivided?: boolean,
  bodyDarker?: boolean,
  bodyWithPadding?: boolean,
  bodyClasses?: boolean,
  divided?: boolean,
  as?: string,
  size: 'default' | 'small' | 'medium' | 'large' | 'full',
} & InputHTMLAttributes & Data, VanillaDialogClassesValidKeys>;
