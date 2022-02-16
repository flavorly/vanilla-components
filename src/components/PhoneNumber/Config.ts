export const VanillaPhoneNumberConfig = {
  fixedClasses: {
    input: 'appearance-none block w-full leading-normal sm:text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed  focus:outline-none focus:ring-1',
    wrapper: 'relative',
    addonBefore: 'absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer',
    addonAfter: 'absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer',
    addonBeforeInputClasses: 'pl-10',
    addonAfterInputClasses: 'pr-10',
    addonClasses: 'w-5 h-5',
  },
  // Default Input appearance
  classes: {
    input: 'border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:focus:ring-offset-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:focus:border-primary-400',
    wrapper : '',
    addonBefore: '',
    addonAfter: '',
    addonBeforeInputClasses: '',
    addonAfterInputClasses: '',
    addonClasses: 'text-gray-300 dark:text-gray-600',
  },
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        input: 'text-red-400 border-red-400 focus:border-red-400 placeholder-red-400 dark:bg-gray-900 focus:ring-red-500  dark:focus:border-red-400',
        wrapper : '',
        addonBefore: '',
        addonAfter: '',
        addonBeforeInputClasses: '',
        addonAfterInputClasses: '',
        addonClasses: 'text-red-400',
      },
    },
  },
};

export const VanillaPhoneNumberClassesKeys = Object.keys(VanillaPhoneNumberConfig.classes);

export type VanillaPhoneNumberClassesValidKeys = keyof typeof VanillaPhoneNumberConfig.classes;


