import { mapValues } from 'lodash';
import { commonClasses } from '@/core/config/commonClasses';
import { enterAndLeave, mergeClasses, popperOptions } from '@/core';
export const VanillaDropdownConfig = {
  fixedClasses: {

  },
  // Default Input appearance
  classes: {
    wrapper: 'relative',
    chevronIcon: '-mr-1 ml-2 h-5 w-5',
    overlay: 'fixed top-0 right-0 left-0 bottom-0 z-[99] bg-black/50',

    menuWrapper: 'absolute z-[100]',

    dropdown: mergeClasses(
      commonClasses.dropdownsBackground,
      commonClasses.dropdownsBorder,
      commonClasses.dropdownsRadius,
      commonClasses.dropdownsShadows,
      'top-5 py-1 w-56',
      'focus:ring-0',
    ),



    // Transitions
    ...enterAndLeave,
  },
};

export const VanillaDropdownPopperDefaultOptions = popperOptions;

export const VanillaDropdownClassesKeys = Object.keys(VanillaDropdownConfig.classes);

export type VanillaDropdownClassesValidKeys = keyof typeof VanillaDropdownConfig.classes;


