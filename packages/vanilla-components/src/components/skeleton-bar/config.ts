import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantProps } from '@/core/types'

export const skeletonBarConfig = {
  fixedClasses: '',
  classes: {
    wrapper: 'animate-pulse space-y-1',
    class: 'h-5 rounded w-full bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-500 dark:to-gray-700',
  },

  // Variants
  variants: {
    error: {
      classes: {
        wrapper: '',
        class: '',
      },
    },
  },
}

export const skeletonBarClassesKeys = Object.keys(skeletonBarConfig.classes)

export declare type SkeletonBarClassesValidKeys = keyof typeof skeletonBarConfig.classes

export declare type SkeletonBarProps = WithVariantProps<{
  count?: number
  as?: string
} & InputHTMLAttributes & Data>

