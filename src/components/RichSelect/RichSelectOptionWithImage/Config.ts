import { commonClasses } from '@/core';

export const VanillaRichSelectOptionWithImageConfig = {
  classes: {
    wrapper: 'relative group',
    disabled: commonClasses.optionOrItemDisabled,

    labelAndImageWrapper: 'relative',
    labelAndImageContainer: 'flex items-center space-x-2 text-sm block',
    labelAndImageContainerSelected : 'font-semibold',
    labelAndImageContainerRegular: 'font-normal',

    image: 'flex-shrink-0 w-6 h-6 bg-gray-500 dark:bg-gray-800 bg-center bg-cover rounded-full border border-gray-300 dark:border-gray-500 shadow',
    label: 'block whitespace-nowrap truncate',

    description: 'w-100 text-xs text-left mt-1 truncate',
    descriptionSelected: 'font-normal opacity-60',
    descriptionRegular: 'opacity-60',

    selectedIconContainer: 'absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-primary-600',
    icon: commonClasses.iconsSize,
  },
};

export const VanillaRichSelectOptionWithImageClassesKeys = Object.keys(VanillaRichSelectOptionWithImageConfig.classes);

export type VanillaRichSelectOptionWithImageClassesValidKeys = keyof typeof VanillaRichSelectOptionWithImageConfig.classes;


