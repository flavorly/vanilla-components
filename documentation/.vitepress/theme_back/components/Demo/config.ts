import type { InputHTMLAttributes } from 'vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { Data, WithVariantPropsAndClassesList } from '@flavorly/vanilla-components'

export const myOwnComponentConfig = {
  fixedClasses: {
    someClassYouWant: 'i-will-be-a-fixed-class',
  },

  // Default appearance
  classes: {
    someClassYouWant: 'bg-indigo-100',
  },

  // Variants
  variants: {

    // Used for Errors
    error: {
      classes: {
        someClassYouWant: 'bg-red-100',
      },
    },

    // More variants can go here
  },
}

export const myOwnComponentClassesKeys = Object.keys(myOwnComponentConfig.classes)

export declare type MyOwnComponentClassesValidKeys = keyof typeof myOwnComponentConfig.classes

export declare type MyOwnComponentProps = WithVariantPropsAndClassesList<{
  type?: string
  placeholder?: string
} & InputHTMLAttributes & Data, MyOwnComponentClassesValidKeys>

