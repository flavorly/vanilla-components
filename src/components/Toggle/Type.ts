import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaToggleClassesValidKeys } from './Config';
import { ObjectWithProperties } from '@/core/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type  VanillaToggleSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[];
export type VanillaToggleValue = VanillaToggleSimpleValue | VanillaToggleSimpleValue[] | ObjectWithProperties<VanillaToggleSimpleValue>;

export type VanillaToggleProps = WithVariantPropsAndClassesList<{
    modelValue?: VanillaToggleValue,
    value?: VanillaToggleValue,
    checkedValue?: VanillaToggleValue,
    uncheckedValue?: VanillaToggleValue,
}
& InputHTMLAttributes & Data & {
  type?: 'checkbox'
  checked?: boolean
}, VanillaToggleClassesValidKeys>;
