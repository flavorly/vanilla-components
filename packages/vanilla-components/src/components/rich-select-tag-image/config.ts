import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '../../core/config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const richSelectTagWithImageConfig = {
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

export const richSelectTagWithImageClassesKeys = Object.keys(richSelectTagWithImageConfig.classes)

export declare type RichSelectTagWithImageClassesValidKeys = keyof typeof richSelectTagWithImageConfig.classes

export declare type RichSelectTagWithImageProps = WithVariantPropsAndClassesList<{
  name?: string | undefined
  image?: string | undefined
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
} & InputHTMLAttributes & Data, RichSelectTagWithImageClassesValidKeys>

