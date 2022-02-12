const VanillaInputConfig = {
  // Fixed Classes
  fixedClasses: 'appearance-none block w-full leading-normal sm:text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed  focus:outline-none focus:ring-1',
  // Default Input appearance
  classes: 'border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:focus:ring-offset-gray-900 focus:ring-primary-600 focus:border-primary-600 focus:ring-1 dark:focus:border-primary-400',
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: 'text-white bg-red-600 hover:bg-red-500 focus:border-red-700 active:bg-red-700 text-sm font-medium border border-transparent px-3 py-2 rounded-md',
    },
  },
};

export default VanillaInputConfig;
