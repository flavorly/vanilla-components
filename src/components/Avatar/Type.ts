import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaAvatarClassesValidKeys } from './Config';

export declare type VanillaAvatarValue = never | undefined;
export declare type VanillaAvatarPreview = string | ArrayBuffer | null | undefined;

export declare type VanillaAvatarProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaAvatarValue,
  currentPhotoUrl?: string | undefined,
  currentPhotoAltTag?: string | undefined,
  avatarInitials?: string | undefined,
  uploadButtonLabel?: string | undefined,
  resetButtonLabel?: string | undefined,
} & InputHTMLAttributes & Data, VanillaAvatarClassesValidKeys>;
