import type { InputHTMLAttributes } from 'vue'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '../index'
import type { VanillaToggleClassesValidKeys } from './config'

type VanillaToggleSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol | object | string[]
export declare type VanillaToggleValue = VanillaToggleSimpleValue | VanillaToggleSimpleValue[] | ObjectWithProperties<VanillaToggleSimpleValue>

export declare type VanillaToggleProps = WithVariantPropsAndClassesList<{
    modelValue?: VanillaToggleValue
    value?: VanillaToggleValue
    checkedValue?: VanillaToggleValue
    uncheckedValue?: VanillaToggleValue
}
& InputHTMLAttributes & Data & {
  type?: 'checkbox'
  checked?: boolean
}, VanillaToggleClassesValidKeys>
