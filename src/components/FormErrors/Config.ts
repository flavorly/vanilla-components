import { commonClasses } from '@/core/config/commonClasses';
export const VanillaFormErrorsConfig = {
  fixedClasses: 'mt-2 text-xs',
  // Default Input appearance
  classes: commonClasses.inputsErrorText,
  // Variants
  variants: {
    error: {
      classes: '',
    },
  },
};

export const VanillaFormErrorsClassesKeys = Object.keys(VanillaFormErrorsConfig.classes);

export type VanillaFormErrorsClassesValidKeys = keyof typeof VanillaFormErrorsConfig.classes;


