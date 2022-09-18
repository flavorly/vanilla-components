import { commonClasses } from '../../core'

export const VanillaRichSelectTagWithImageConfig = {
  classes: {
    wrapper: 'relative group',
    disabled: commonClasses.optionOrItemDisabled,

    labelAndImageWrapper: 'relative',
    labelAndImageContainer: 'flex items-center space-x-2 text-sm block',
    labelAndImageContainerSelected: 'font-semibold',
    labelAndImageContainerRegular: 'font-normal',

    image: 'flex-shrink-0 w-6 h-6 bg-gray-500 dark:bg-gray-800 bg-center bg-cover rounded-full border border-gray-300 dark:border-gray-500 shadow',
    label: 'block whitespace-nowrap truncate font-semibold',
  },
}

export const VanillaRichSelectTagWithImageClassesKeys = Object.keys(VanillaRichSelectTagWithImageConfig.classes)

export type VanillaRichSelectTagWithImageClassesValidKeys = keyof typeof VanillaRichSelectTagWithImageConfig.classes

