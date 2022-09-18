import type { InputHTMLAttributes } from 'vue'
import type { VanillaButtonClassesValidKeys } from './config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export declare type VanillaButtonProps = WithVariantPropsAndClassesList<{
    as?: string
    asDeep?: string
    label?: string
    loading?: boolean
    disabled?: boolean | string
    focusOnMount?: boolean
    type?: string
} & InputHTMLAttributes & Data, VanillaButtonClassesValidKeys>
