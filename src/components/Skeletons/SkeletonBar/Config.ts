export const VanillaSkeletonBarConfig = {
  fixedClasses: '',
  classes: {
    wrapper: 'animate-pulse space-y-1',
    class: 'h-5 rounded w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-500 dark:to-gray-700',
  },
  // Variants
  variants: {
    error: {
      classes: {
        wrapper: '',
        class: '',
      },
    },
  },
};

export const VanillaSkeletonBarClassesKeys = Object.keys(VanillaSkeletonBarConfig.classes);

export type VanillaSkeletonBarClassesValidKeys = keyof typeof VanillaSkeletonBarConfig.classes;


