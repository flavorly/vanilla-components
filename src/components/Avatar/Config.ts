export const VanillaAvatarConfig = {
  fixedClasses: {
    wrapper: '',
    wrapperImageAndButtons : '',
    imageAndPreviewContainer: 'flex items-center justify-center cursor-pointer',
    imagePreviewContainer: '',
    currentImage: 'rounded-full h-20 w-20 object-cover',
    avatarPlaceholder: 'inline-flex items-center justify-center rounded-full h-20 w-20 rounded-full p-5 border border-gray-100 dark:border-gray-500 shadow-sm',
    avatarPlaceholderText: 'text-sm font-light leading-none',
    buttonsContainer: 'flex items-center justify-center',
    preview: 'block w-20 h-20 border border-gray-100 dark:border-gray-500 shadow-sm rounded-full',
  },
  // Default Input appearance
  classes: {
    wrapper: 'relative',
    wrapperImageAndButtons : '',
    imageAndPreviewContainer: '',
    imagePreviewContainer: 'mt-2',
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
        wrapperImageAndButtons : '',
        imageAndPreviewContainer: '',
        imagePreviewContainer: 'mt-2',
        currentImage: '',
        avatarPlaceholder: 'bg-red-100 text-red-500',
        avatarPlaceholderText: '',
        buttonsContainer: '',
        preview: '',
      },
    },
  },
};

export const VanillaAvatarClassesKeys = Object.keys(VanillaAvatarConfig.classes);

export type VanillaAvatarClassesValidKeys = keyof typeof VanillaAvatarConfig.classes;


