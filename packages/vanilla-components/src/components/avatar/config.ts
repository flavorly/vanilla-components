import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const avatarConfig = {
  fixedClasses: {
    wrapper: '',
    wrapperImageAndButtons: '',
    imageAndPreviewContainer: 'flex items-center justify-center cursor-pointer',
    imagePreviewContainer: 'mt-2',
    currentImage: 'rounded-full object-cover',
    avatarPlaceholder: 'inline-flex items-center justify-center rounded-full rounded-full p-5 border-0 ring-1',
    avatarPlaceholderText: 'text-sm font-light leading-none',
    buttonsContainer: 'flex items-center justify-center mt-2',
    preview: 'relative shadow-sm rounded-full border-0 ring-1',
    size: 'h-20 w-20',
  },

  // Default Input appearance
  classes: {
    wrapper: 'relative',
    wrapperImageAndButtons: '',
    imageAndPreviewContainer: '',
    imagePreviewContainer: '',
    currentImage: '',
    avatarPlaceholder: 'bg-primary-100 text-primary-800 dark:bg-gray-600 dark:text-white ring-gray-300 dark:ring-white/30',
    avatarPlaceholderText: '',
    buttonsContainer: '',
    preview: 'ring-gray-300 dark:ring-white/30',
    size: '',
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
        avatarPlaceholder: 'bg-red-100 text-red-500 ring-red-300 dark:ring-red-500/60',
        avatarPlaceholderText: '',
        buttonsContainer: '',
        preview: '',
        size: 'h-20 w-20',
      },
    },
  },
}

export const avatarClassesKeys = Object.keys(avatarConfig.classes)

export declare type AvatarClassesValidKeys = keyof typeof avatarConfig.classes

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

