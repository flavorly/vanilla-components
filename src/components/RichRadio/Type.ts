import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaRichRadioClassesValidKeys } from './Config';
import { ObjectWithProperties } from '@/core/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type  VanillaRichRadioSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[];
export type VanillaRichRadioValue = VanillaRichRadioSimpleValue | VanillaRichRadioSimpleValue[] | ObjectWithProperties<VanillaRichRadioSimpleValue>;

export type VanillaRichRadioProps = WithVariantPropsAndClassesList<{
    modelValue?: VanillaRichRadioValue,
    value?: VanillaRichRadioValue,
    checkedValue?: VanillaRichRadioValue,
    uncheckedValue?: VanillaRichRadioValue,
}
& InputHTMLAttributes & Data & {
  type?: 'checkbox'
  checked?: boolean
}, VanillaRichRadioClassesValidKeys>;
