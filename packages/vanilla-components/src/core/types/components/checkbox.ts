import type { InputHTMLAttributes } from 'vue'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '../index'
import type { VanillaCheckboxClassesValidKeys } from './config'

type VanillaCheckboxSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[]
export declare type VanillaCheckboxValue = VanillaCheckboxSimpleValue | VanillaCheckboxSimpleValue[] | ObjectWithProperties<VanillaCheckboxSimpleValue>

export declare type VanillaCheckboxProps = WithVariantPropsAndClassesList<{
    modelValue?: VanillaCheckboxValue
    value?: VanillaCheckboxValue
    checkedValue?: VanillaCheckboxValue
    uncheckedValue?: VanillaCheckboxValue
}
& InputHTMLAttributes & Data & {
  type?: 'checkbox'
  checked?: boolean
}, VanillaCheckboxClassesValidKeys>
