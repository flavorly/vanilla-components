import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaDatatableClassesValidKeys } from './Config';
import { Options, Placement } from '@popperjs/core';

export type VanillaDatatableValue = boolean;

export type VanillaDatatableProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaDatatableValue,
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
} & InputHTMLAttributes & Data, VanillaDatatableClassesValidKeys>;
