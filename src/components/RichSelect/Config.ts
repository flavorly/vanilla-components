import { enterAndLeave } from '@/core/config/transitions';
import {  merge } from 'lodash';
import { mergeClasses } from '@/core';
import { commonClasses } from '@/core/config/commonClasses';

const defaultVariant = {
    wrapper: 'relative',

    // TDropdown Component
    trigger: mergeClasses(
      '',
      commonClasses.inputsBackground,
      commonClasses.inputsBorder,
      commonClasses.inputsRing,
      commonClasses.inputsRadius,
    ),

    dropdown: mergeClasses(
      'z-10',
      commonClasses.dropdownsBackground,
      commonClasses.dropdownsBorder,
      commonClasses.dropdownsRadius,
      commonClasses.dropdownsShadows,
    ),
    // Dropdown content
    dropdownContent: 'pt-1 space-y-2',

    // Clear button
    clearButton: mergeClasses(
      'absolute flex items-center justify-center text-gray-600 dark:text-gray-300 dark:text rounded mr-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-opacity-70 top-1/2 right-0 transform -translate-y-1/2',
      commonClasses.buttonRing,
      commonClasses.iconsSize,
      commonClasses.inputsTransition,
    ),

    // Option list
    optionsList: 'space-y-1',

    optionsListLoadingMore: 'flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 text-center',

    // Option wrapper
    optionWrapper: '',

    // Option button
    option: mergeClasses(
      'w-full disabled:opacity-50',
      'cursor-pointer disabled:cursor-not-allowed',
      'text-sm font-normal dark:text-white',
    ),

    selectedOption: 'font-medium text-white bg-primary-500',
    highlightedOption: 'text-primary-900 bg-primary-100 dark:bg-primary-400 dark:text-white',
    selectedHighlightedOption: 'font-medium text-white bg-primary-500',

    //  Option content
    optionContent: 'flex items-center justify-between px-3 py-3',
    optionLabel: 'block truncate',
    optionSelectedIcon: mergeClasses(
      '',
      commonClasses.iconsSize,
    ),

    // Option group
    optgroup: 'space-y-2',
    optgroupContent: '',
    optgroupLabel: 'block px-3 py-2 text-xs text-gray-400 uppercase truncate',
    optgroupOptionsList: 'px-2 pb-2',

    // Search
    searchWrapper: 'inline-block w-full px-3 py-2',

    searchInput: mergeClasses('inline-block w-full shadow-inner focus:ring-opacity-70 text-sm px-4 py-2',
      commonClasses.inputsTextColor,
      commonClasses.inputsRing,
      commonClasses.inputsBorder,
      commonClasses.inputsRadius,
      commonClasses.inputsShadows,
      commonClasses.inputsBackgroundDarkerOrSofter,
    ),

    // State texts
    searchingText: 'px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center',
    needsMoreCharsText: 'px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center',
    noResultsText: 'px-3 py-2 text-sm text-gray-500 dark:text-gray-400 text-center',

    // Select button
    selectButtonLabel: 'block pr-4 truncate',
    selectButtonPlaceholder: 'block text-gray-400 truncate',
    selectButtonSearchingPlaceholder: 'block text-gray-400 truncate',
    selectButtonLoadingIcon: 'flex-shrink-0 w-4 h-4 ml-1 text-gray-600',
    selectButtonSelectorIcon: 'flex-shrink-0 w-4 h-4 ml-1 text-gray-600',

    // Select button tags
    tagsWrapper: 'flex flex-wrap overflow-hidden -mx-2 -my-2.5 py-1 pr-8',

    // Single tag
    tag: 'bg-primary-500 disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition white-space-no m-0.5 max-w-full h-8 flex items-center cursor-pointer',

    tagLabel: 'px-3',

    tagDeleteButton: '-ml-1.5 h-full hover:bg-primary-600 hover:shadow-sm inline-flex items-center px-2 transition focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-opacity-50 rounded-r',

    tagDeleteButtonIcon: 'w-3 h-3',
    ...enterAndLeave,
};

export const VanillaRichSelectConfig = {
  fixedClasses: {
    trigger: mergeClasses(
      'flex items-center justify-between w-full',
      commonClasses.inputsText,
      commonClasses.inputsTransition,
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
      commonClasses.inputsSpacing,
    ),
  },
  // Default Input appearance
  classes: {
    ...defaultVariant,
  },
  // Variants
  variants: {
    // Errors
    error: {
      classes : {
          ...merge(defaultVariant, {
            trigger: mergeClasses(
              commonClasses.inputsErrorsBackground,
              commonClasses.inputsErrorsBorder,
              commonClasses.inputsErrorsRing,
              commonClasses.inputsErrorText,
              commonClasses.inputsRadius,
            ),
            // Clear button
            clearButton: mergeClasses(
              'absolute flex items-center justify-center text-red-400 dark:text-red-300 dark:text rounded mr-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-opacity-70 top-1/2 right-0 transform -translate-y-1/2',
              commonClasses.buttonErrorsRing,
              commonClasses.iconsSize,
              commonClasses.inputsTransition,
            ),
          }),
      },
    },
  },
};

console.log(VanillaRichSelectConfig);

/**
 * Converts our own config into VariantJS config
 * @param configuration
 * @constructor
 */
export const VanillaRichSelectConfigToVariantJs = (configuration: any) => {
  return configuration;
};


export const VanillaRichSelectClassesKeys = Object.keys(VanillaRichSelectConfig.classes);

export type  VanillaRichSelectClassesValidKeys = keyof typeof VanillaRichSelectConfig.classes;


