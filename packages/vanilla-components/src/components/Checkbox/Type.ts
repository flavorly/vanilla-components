import type { InputHTMLAttributes } from 'vue'
import type { VanillaCheckboxClassesValidKeys } from './Config'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '../../core/types'

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
