import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '@/core/config'
import { mergeClasses } from '@/core/helpers'
import type { Data, WithVariantProps } from '@/core/types'

export const formsConfig = {
  fixedClasses: {
    label: 'block font-medium text-sm text-gray-700 dark:text-white cursor-pointer mb-2',
    errors: mergeClasses('mt-2 text-xs', commonClasses.inputsErrorText),
    feedback: 'mt-2 ml-1 text-xs text-gray-500 opacity-75 dark:text-gray-300 cursor-pointer',
    section: 'bg-gray-50 dark:bg-gray-800/50',
    sectionDivided: 'bg-gray-50 dark:bg-gray-800/50 sm:divide-y sm:divide-gray-200 dark:divide-gray-800',
  },

  // Default Input appearance
  classes: {
    label: '',
    errors: '',
    feedback: '',
    section: '',
    sectionDivided: '',
  },

  // Variants
  variants: {
    error: {
      classes: {
        label: '',
        errors: '',
        feedback: '',
        section: '',
        sectionDivided: '',
      },
    },
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

