export const VanillaFormSectionConfig = {
  fixedClasses: '',
  // Default Input appearance
  classes: 'bg-gray-50 dark:bg-gray-800/50',
  // Variants
  variants: {
    divided: {
      classes: 'sm:divide-y sm:divide-gray-200 dark:divide-gray-800 bg-gray-50 dark:bg-gray-800/50',
    },
  },
};

export const VanillaFormSectionClassesKeys = Object.keys(VanillaFormSectionConfig.classes);

export type VanillaFormSectionClassesValidKeys = keyof typeof VanillaFormSectionConfig.classes;


