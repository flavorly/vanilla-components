import type { InputHTMLAttributes } from 'vue'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '../index'
import type { VanillaRichRadioClassesValidKeys } from './config'

type VanillaRichRadioSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[]
export declare type VanillaRichRadioValue = VanillaRichRadioSimpleValue | VanillaRichRadioSimpleValue[] | ObjectWithProperties<VanillaRichRadioSimpleValue>

export declare type VanillaRichRadioProps = WithVariantPropsAndClassesList<{
    modelValue?: VanillaRichRadioValue
    value?: VanillaRichRadioValue
    checkedValue?: VanillaRichRadioValue
    uncheckedValue?: VanillaRichRadioValue
}
& InputHTMLAttributes & Data & {
  type?: 'checkbox'
  checked?: boolean
}, VanillaRichRadioClassesValidKeys>
