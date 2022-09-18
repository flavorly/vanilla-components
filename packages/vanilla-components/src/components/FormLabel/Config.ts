export const VanillaFormLabelConfig = {
  fixedClasses: '',
  classes: 'block font-medium text-sm text-gray-700 dark:text-white cursor-pointer mb-2',

  // Variants
  variants: {
    error: {
      classes: '',
    },
  },
}

export const VanillaFormLabelClassesKeys = Object.keys(VanillaFormLabelConfig.classes)

export type VanillaFormLabelClassesValidKeys = keyof typeof VanillaFormLabelConfig.classes

