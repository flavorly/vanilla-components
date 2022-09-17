import type { InputHTMLAttributes } from 'vue'
import type { VanillaButtonClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export declare type VanillaButtonProps = WithVariantPropsAndClassesList<{
    as?: string
    asDeep?: string
    label?: string
    loading?: boolean
    disabled?: boolean | string
}
& InputHTMLAttributes & Data & {
  type?: string
  disabled?: boolean | string
}, VanillaButtonClassesValidKeys>
