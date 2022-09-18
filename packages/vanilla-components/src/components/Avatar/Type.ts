import type { InputHTMLAttributes } from 'vue'
import type { VanillaAvatarClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export declare type VanillaAvatarValue = never | undefined
export declare type VanillaAvatarPreview = string | ArrayBuffer | null | undefined

export declare type VanillaAvatarProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaAvatarValue
  currentPhotoUrl?: string | undefined
  currentPhotoAltTag?: string | undefined
  avatarInitials?: string | undefined
  uploadButtonLabel?: string | undefined
  resetButtonLabel?: string | undefined
} & InputHTMLAttributes & Data, VanillaAvatarClassesValidKeys>
