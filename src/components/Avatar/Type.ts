import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaAvatarClassesValidKeys } from './Config';

export type VanillaAvatarValue = never | undefined;
export type VanillaAvatarPreview = string | ArrayBuffer | null | undefined;

export type VanillaAvatarProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaAvatarValue,
  currentPhotoUrl?: string | undefined,
  currentPhotoAltTag?: string | undefined,
  avatarInitials?: string | undefined,
  uploadButtonLabel?: string | undefined,
  resetButtonLabel?: string | undefined,
} & InputHTMLAttributes & Data, VanillaAvatarClassesValidKeys>;
