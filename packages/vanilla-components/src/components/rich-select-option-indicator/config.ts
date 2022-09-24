import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '@/core/config'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const richSelectOptionWithIndicatorsConfig = {
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

export const richSelectOptionWithIndicatorsClassesKeys = Object.keys(richSelectOptionWithIndicatorsConfig.classes)

export declare type RichSelectOptionWithIndicatorsClassesValidKeys = keyof typeof richSelectOptionWithIndicatorsConfig.classes

export declare type RichSelectOptionWithIndicatorsProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  status?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, RichSelectOptionWithIndicatorsClassesValidKeys >
