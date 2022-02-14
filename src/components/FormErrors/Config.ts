export const VanillaFormErrorsConfig = {
  fixedClasses: 'mt-2 text-xs',
  // Default Input appearance
  classes: 'text-red-400',
  // Variants
  variants: {
    error: {
      classes: '',
    },
  },
};

export const VanillaFormErrorsClassesKeys = Object.keys(VanillaFormErrorsConfig.classes);

export type VanillaFormErrorsClassesValidKeys = keyof typeof VanillaFormErrorsConfig.classes;


