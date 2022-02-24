import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaCheckboxClassesValidKeys } from './Config';
import { ObjectWithProperties } from '@/core/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type  VanillaCheckboxSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol;
export type VanillaCheckboxValue = VanillaCheckboxSimpleValue | VanillaCheckboxSimpleValue[] | ObjectWithProperties<VanillaCheckboxSimpleValue>;

export type VanillaCheckboxProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaCheckboxValue,
}
& InputHTMLAttributes & Data & {
  type?: 'checkbox'
}, VanillaCheckboxClassesValidKeys>;
