import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const inputGroupConfig = {
  fixedClasses: {},
  classes: {
    wrapper: 'grid space-y-2',
    wrapperWithPadding: 'px-6 py-3.5 mt-0',
    label: '',
  },
  variants: {
    inline: {
      classes: {
        wrapper: 'sm:grid sm:grid-cols-3 sm:gap-4',
        wrapperWithPadding: 'sm:px-6 px-6 py-5',
        label: 'flex items-center text-sm leading-3 font-medium text-gray-500 dark:text-white',
      },
    },
    content: {
      classes: {
        wrapper: 'sm:grid',
        wrapperWithPadding: 'px-6 py-3 mt-0',
        label: '',
      },
    },
  },
}

export const inputGroupClassesKeys = Object.keys(inputGroupConfig.classes)

export declare type InputGroupClassesValidKeys = keyof typeof inputGroupConfig.classes
export declare type InputGroupValue = string | number | undefined
export declare type InputGroupProps = WithVariantPropsAndClassesList<{
} & InputHTMLAttributes & Data, InputGroupClassesValidKeys>
