import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaCheckboxClassesValidKeys } from './Config';
import { ObjectWithProperties } from '@/core/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type  VanillaCheckboxSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[];
export declare type VanillaCheckboxValue = VanillaCheckboxSimpleValue | VanillaCheckboxSimpleValue[] | ObjectWithProperties<VanillaCheckboxSimpleValue>;

export declare type VanillaCheckboxProps = WithVariantPropsAndClassesList<{
    modelValue?: VanillaCheckboxValue,
    value?: VanillaCheckboxValue,
    checkedValue?: VanillaCheckboxValue,
    uncheckedValue?: VanillaCheckboxValue,
}
& InputHTMLAttributes & Data & {
  type?: 'checkbox'
  checked?: boolean
}, VanillaCheckboxClassesValidKeys>;
