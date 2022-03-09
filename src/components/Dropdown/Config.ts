import { commonClasses } from '@/core/config/commonClasses';
import { mergeClasses, popperOptions } from '@/core';

export const VanillaDropdownConfig = {
  fixedClasses: {},
  // Default appearance
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
      'top-5 w-56',
      'focus:ring-0 focus:outline-none',
      'overflow-hidden',
    ),

    menuItemsWrapper: 'space-y-1',
    menuItem : 'group flex items-center w-full px-4 py-3 text-sm leading-5',
    menuItemHighlighted: 'text-primary-900 bg-primary-100 dark:bg-primary-300 dark:text-black z-10',
    menuItemNotHighlighted: 'text-gray-700 dark:text-white',

    arrow: 'top-[-5px] invisible -z-[1] before:border-b-0 before:border-r-0 before:absolute before:w-2 before:h-2 before:bg-white  before:dark:bg-gray-900 before:visible before:rotate-45 before:border before:border-1 before:border-gray-300 before:dark:border-gray-700 before:rounded-sm',

    // Transitions
    enterActiveClass: 'transition duration-100 ease-out',
    enterFromClass: 'transform scale-95 opacity-0',
    enterToClass: 'transform scale-100 opacity-100',
    leaveActiveClass: 'transition duration-75 ease-in',
    leaveFromClass: 'transform scale-100 opacity-100',
    leaveToClass: 'transform scale-95 opacity-0',
  },
};

export const VanillaDropdownPopperDefaultOptions = popperOptions;

export const VanillaDropdownClassesKeys = Object.keys(VanillaDropdownConfig.classes);

export type VanillaDropdownClassesValidKeys = keyof typeof VanillaDropdownConfig.classes;


