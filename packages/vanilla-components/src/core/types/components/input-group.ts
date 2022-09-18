import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaInputGroupClassesValidKeys } from './config'

export declare type VanillaInputGroupValue = string | number | undefined

export declare type VanillaInputGroupProps = WithVariantPropsAndClassesList<{
} & InputHTMLAttributes & Data, VanillaInputGroupClassesValidKeys>
