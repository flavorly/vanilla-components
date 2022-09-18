import { commonClasses } from '../../../core'

export const VanillaSelectCountryOptionConfig = {
  classes: {
    wrapper: 'relative',

    labelAndImageWrapper: 'relative',
    labelAndImageContainer: 'flex items-center space-x-2 text-sm block',
    labelAndImageContainerSelected: 'font-semibold',
    labelAndImageContainerRegular: 'font-normal',

    image: 'flex-shrink-0 w-6 h-6',
    label: 'block whitespace-nowrap truncate',
    selectedIconContainer: 'absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-primary-600',
    fallbackImage: 'flex-shrink-0 w-[24px] h-[16px] bg-gray-300 animate-pulse rounded-sm',
    icon: commonClasses.iconsSize,
  },
}

export const VanillaSelectCountryOptionClassesKeys = Object.keys(VanillaSelectCountryOptionConfig.classes)

export type VanillaSelectCountryOptionClassesValidKeys = keyof typeof VanillaSelectCountryOptionConfig.classes

