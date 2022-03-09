import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDialogClassesValidKeys } from './Config';
import { Options, Placement } from '@popperjs/core';

export type VanillaDialogValue = boolean;

export type VanillaDialogProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDialogValue,
  text?: string,
  buttonVariant?: string,
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
  tagName?: string,
  dropdownTagName?: string,
  disabled?: boolean,
  toggleOnFocus?: boolean,
  toggleOnClick?: boolean,
  toggleOnHover?: boolean,
  placement?: Placement | string,
  popperOptions?: Options,
  overlay?: boolean,
  showArrow?: boolean,
} & InputHTMLAttributes & Data, VanillaDialogClassesValidKeys>;
