import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '@/core/config'
import { mergeClasses } from '@/core/helpers'
import type { Data, WithVariantProps } from '@/core/types'

export const formsConfig = {
  fixedClasses: {
    label: '',
    errors: '',
    feedback: '',
    section: '',
    sectionDivided: '',
    sectionSpaced: '',
    sectionFilled: '',
  },

  // Default Input appearance
  classes: {
    label: 'block font-medium text-sm text-gray-700 dark:text-white cursor-pointer mb-1',
    errors: mergeClasses('mt-2 text-xs', commonClasses.inputsErrorText),
    feedback: 'mt-2 text-xs text-gray-500 opacity-75 dark:text-gray-300 cursor-pointer',
    section: '',
    sectionDivided: 'divide-y divide-gray-200 dark:divide-gray-700',
    sectionSpaced: 'space-y-2',
    sectionFilled: 'bg-gray-50 dark:bg-gray-800/50',
  },
}

export const formClassesKeys = Object.keys(formsConfig.classes)

export declare type FormClassesValidKeys = keyof typeof formsConfig.classes

export declare type FormErrorsProps = WithVariantProps<{
  errors?: string | undefined
  safe?: boolean
} & InputHTMLAttributes & Data>

export declare type FormFeedbackProps = WithVariantProps<{
  text?: string | undefined
  safe?: boolean
} & InputHTMLAttributes & Data>

export declare type FormLabelProps = WithVariantProps<{
  errors?: string | undefined
  safe?: boolean
} & InputHTMLAttributes & Data>

export declare type FormSectionProps = WithVariantProps<{
} & InputHTMLAttributes & Data>

