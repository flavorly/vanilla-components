import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDropdownClassesValidKeys } from './Config';
import { Options, Placement } from '@popperjs/core';

export type VanillaDropdownValue = boolean;

export type VanillaDropdownProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDropdownValue,
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
} & InputHTMLAttributes & Data, VanillaDropdownClassesValidKeys>;
