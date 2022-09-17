import type { InputHTMLAttributes } from 'vue'
import type { VanillaToggleClassesValidKeys } from './Config'
import type { Data, ObjectWithProperties, WithVariantPropsAndClassesList } from '@/core/types'

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
