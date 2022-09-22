import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const AvatarConfig = {
  fixedClasses: {
    wrapper: '',
    wrapperImageAndButtons: '',
    imageAndPreviewContainer: 'flex items-center justify-center cursor-pointer',
    imagePreviewContainer: 'mt-2',
    currentImage: 'rounded-full h-20 w-20 object-cover',
    avatarPlaceholder: 'inline-flex items-center justify-center rounded-full h-20 w-20 rounded-full p-5 border border-gray-100 dark:border-gray-500 shadow-sm',
    avatarPlaceholderText: 'text-sm font-light leading-none',
    buttonsContainer: 'flex items-center justify-center mt-2',
    preview: 'block w-20 h-20 border border-gray-100 dark:border-gray-500 shadow-sm rounded-full',
  },

  // Default Input appearance
  classes: {
    wrapper: 'relative',
    wrapperImageAndButtons: '',
    imageAndPreviewContainer: '',
    imagePreviewContainer: '',
    currentImage: '',
    avatarPlaceholder: 'bg-primary-100 text-primary-800 dark:bg-gray-600 dark:text-white',
    avatarPlaceholderText: '',
    buttonsContainer: '',
    preview: '',
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper: 'relative',
        wrapperImageAndButtons: '',
        imageAndPreviewContainer: '',
        imagePreviewContainer: '',
        currentImage: '',
        avatarPlaceholder: 'bg-red-100 text-red-500',
        avatarPlaceholderText: '',
        buttonsContainer: '',
        preview: '',
      },
    },
  },
}

export const AvatarClassesKeys = Object.keys(AvatarConfig.classes)

export type AvatarClassesValidKeys = keyof typeof AvatarConfig.classes

export declare type AvatarValue = never | undefined

export declare type AvatarPreview = string | ArrayBuffer | null | undefined

export declare type AvatarProps = WithVariantPropsAndClassesList<{
  modelValue?: AvatarValue
  currentPhotoUrl?: string | undefined
  currentPhotoAltTag?: string | undefined
  avatarInitials?: string | undefined
  uploadButtonLabel?: string | undefined
  resetButtonLabel?: string | undefined
} & InputHTMLAttributes & Data, AvatarClassesValidKeys>

