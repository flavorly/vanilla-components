export const VanillaRichRadioConfig = {
  fixedClasses: {
    container: 'relative flex-1',
    optionContainer: 'rounded-lg',
    optionContainerSeparated: 'space-y-2',
    optionContainerNonSeparated: '-space-y-px',
  },

  // Default Input appearance
  classes: {
    wrapper: '',
    container: '',
    optionContainer: '',
    optionContainerSeparated: '',
    optionContainerNonSeparated: '',
  },

  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper: '',
        container: '',
        optionContainer: '',
        optionContainerSeparated: '',
        optionContainerNonSeparated: '',
      },
    },
  },
}

export const VanillaRichRadioClassesKeys = Object.keys(VanillaRichRadioConfig.classes)

export type VanillaRichRadioClassesValidKeys = keyof typeof VanillaRichRadioConfig.classes

