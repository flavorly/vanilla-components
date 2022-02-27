import { mapValues } from 'lodash';
import { mergeClasses } from '@/core';

export const VanillaRichRadioConfig = {
  fixedClasses: {
  },
  // Default Input appearance
  classes: {
    wrapper: '',
    container: 'relative flex-1',

    optionContainer: 'rounded-lg',
    optionContainerSeparated: 'space-y-2',
    optionContainerNonSeparated: '-space-y-px',

    option: mergeClasses(
      'relative flex px-5 py-4 cursor-pointer focus:outline-none',
    ),

    optionChecked: 'bg-primary-100 dark:bg-primary-500/60 text-white border-primary-200 dark:border-primary-500 z-10',
    optionUnchecked: 'bg-white dark:bg-gray-900',

    optionHighlighted: 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 ring-primary-600 border border-primary-200 dark:bg-primary-500 dark:border-primary-500 z-10',
    optionNonHighlighted: 'border border-gray-200 dark:border-gray-700',

    optionSeperated: 'rounded-lg',

    optionNonSeparatedFirst: 'rounded-tl-lg rounded-tr-lg',
    optionNonSeparatedLast: 'rounded-bl-lg rounded-br-lg',

    optionCompact: 'px-4 py-2',
    optionNonCompact: 'px-5 py-4',

    radio: 'h-4 w-4 mt-1 cursor-pointer rounded-full border flex items-center justify-center',
    radioHighlighted: 'ring-2 ring-offset-2 ring-primary-500',
    radioChecked: 'bg-primary-600 border-transparent dark:bg-gray-900 ring-offset-white dark:ring-offset-gray-900',
    radioUnchecked: 'bg-white dark:bg-gray-700 border-gray-300',
    radioInner: 'rounded-full bg-white w-1.5 h-1.5',

    checkedIconWrapper: 'flex-shrink-0',
    checkedIcon: 'w-6 h-6',
    checkedIconOpacity: 'fill-opacity-90 dark:fill-opacity-30 fill-[#4f46e5] dark:fill-[#fff]',

    contentWrapper: 'ml-3 flex items-center justify-between text-sm',
    contentWrapperIfNotRadio: 'w-full',
    contentInner: '',
    content: 'flex items-center',

    label: 'font-medium',
    labelChecked: 'font-bold text-primary-900 dark:text-white',
    labelUnchecked: 'font-normal text-gray-900 dark:text-white',

    description: 'inline',
    descriptionChecked: 'text-primary-700 dark:text-gray-200',
    descriptionUnchecked: 'text-gray-500 dark:text-gray-400',

  },
  // Variants
  variants: {
    // Used for Errors
    error: {
      classes: {
        wrapper : '',
        container: '',
      },
    },
  },
};


export const VanillaRichRadioClassesKeys = Object.keys(VanillaRichRadioConfig.classes);

export type VanillaRichRadioClassesValidKeys = keyof typeof VanillaRichRadioConfig.classes;


