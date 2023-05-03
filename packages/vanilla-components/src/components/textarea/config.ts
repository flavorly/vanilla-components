import type { InputHTMLAttributes } from 'vue'
import merge from 'lodash/merge'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'
import { inputConfig } from '../input/config'
import { mergeClasses } from '../../core/helpers'
import { commonClasses } from '../../core/config'

export const textareaConfig = merge({}, inputConfig, {
  fixedClasses: {
    input: mergeClasses(
      commonClasses.inputsText,
      'appearance-none w-full focus:outline-none',
      commonClasses.inputsShadows,
      commonClasses.inputsDisabled,
      commonClasses.inputsBorder,
      'resize-y max-h-[10rem]',
      'scrollbar-thin',
    ),
    addonBefore: 'absolute top-[0.8rem] left-0 pl-3 flex items-center cursor-pointer',
    addonAfter: 'absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer',
  },
})

export const textareaClassesKeys = Object.keys(textareaConfig.classes)

export declare type TextareaClassesValidKeys = keyof typeof textareaConfig.classes

export declare type TextareaValue = string | number | string[] | undefined

export declare type TextareaProps = WithVariantPropsAndClassesList<{
  modelValue?: TextareaValue
  rows?: string | number
  placeholder?: string
  copiable?: boolean
  autosize?: boolean
} & InputHTMLAttributes & Data, TextareaClassesValidKeys>

