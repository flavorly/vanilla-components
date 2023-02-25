import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '../../core/config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const richSelectOptionWithImageConfig = {
  classes: {
    wrapper: 'relative group',
    disabled: commonClasses.optionOrItemDisabled,

    labelAndImageWrapper: 'relative',
    labelAndImageContainer: 'flex items-center space-x-2 text-sm block',
    labelAndImageContainerSelected: 'font-semibold',
    labelAndImageContainerRegular: 'font-normal',

    image: 'flex-shrink-0 w-6 h-6 bg-gray-500 dark:bg-gray-800 bg-center bg-cover rounded-full border border-gray-300 dark:border-gray-500 shadow',
    label: 'block whitespace-nowrap truncate',

    description: 'w-100 text-xs text-left mt-1 truncate',
    descriptionSelected: 'font-normal opacity-60',
    descriptionRegular: 'opacity-60',

    selectedIconContainer: 'absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-primary-600',
    icon: commonClasses.iconsSize,
  },
}

export const richSelectOptionWithImageClassesKeys = Object.keys(richSelectOptionWithImageConfig.classes)

export declare type RichSelectOptionWithImageClassesValidKeys = keyof typeof richSelectOptionWithImageConfig.classes

export declare type RichSelectOptionWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, RichSelectOptionWithImageClassesValidKeys>

