import { commonClasses } from '../../../core'

export const VanillaRichSelectOptionWithIndicatorsConfig = {
  classes: {
    wrapper: 'relative group',
    disabled: commonClasses.optionOrItemDisabled,

    labelAndImageWrapper: 'relative',
    labelAndImageContainer: 'flex items-center space-x-2 text-sm block',
    labelAndImageContainerSelected: 'font-semibold',
    labelAndImageContainerRegular: 'font-normal',

    indicator: 'flex-shrink-0 inline-block h-2 w-2 rounded-full',
    label: 'block whitespace-nowrap truncate',

    description: 'w-100 text-xs text-left mt-1',
    descriptionSelected: 'font-normal opacity-60',
    descriptionRegular: 'opacity-60',

    selectedIconContainer: 'absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-primary-600',
    icon: commonClasses.iconsSize,

    indicatorGreen: 'bg-green-400',
    indicatorGray: 'bg-gray-200',
    indicatorRed: 'bg-red-400',
    indicatorYellow: 'bg-yellow-400',
    indicatorBlue: 'bg-blue-400',
  },
}

export const VanillaRichSelectOptionWithIndicatorsClassesKeys = Object.keys(VanillaRichSelectOptionWithIndicatorsConfig.classes)

export type VanillaRichSelectOptionWithIndicatorsClassesValidKeys = keyof typeof VanillaRichSelectOptionWithIndicatorsConfig.classes

