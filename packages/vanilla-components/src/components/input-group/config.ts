import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const inputGroupConfig = {
  fixedClasses: {},
  classes: {
    wrapper: 'grid space-y-2',
    labelWrapper: 'vc-input-label sm:mt-px sm:pt-2 block',
    inputWrapper: 'vc-inputs-container mt-0 grid space-y-2',
    wrapperWithPadding: 'px-6 py-3.5 mt-0',
    label: '',
  },
  variants: {
    inline: {
      classes: {
        wrapper: 'sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 pt-5 sm:pt-0 content-center',
        labelWrapper: 'flex items-center justify-start h-full',
        inputWrapper: 'mt-1 sm:col-span-2 sm:mt-0 flex flex-col space-y-2',
        wrapperWithPadding: 'px-6 py-3.5 mt-0',
        label: '',
      },
    },

    // inline: {
    //   classes: {
    //     wrapper: 'sm:grid sm:grid-cols-3 sm:gap-4',
    //     wrapperWithPadding: 'sm:px-6 px-6 py-5',
    //     label: 'flex items-center text-sm leading-3 font-medium text-gray-500 dark:text-white',
    //   },
    // },
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
