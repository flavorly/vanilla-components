import type { CountryCode } from 'libphonenumber-js/types'
import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'

export const phoneInputConfig = {
  fixedClasses: {
    wrapper: 'relative',
    inputsContainer: 'rounded-lg -space-y-px',
    input: {
      fixedClasses: {
        addonBeforeInputClasses: 'pl-12',
      },
    },
  },
  classes: {
    wrapper: '',
    inputsContainer: '',
    input: {
        fixedClasses: {
          addonBeforeInputClasses: '',
        },
    },
  },
  variants: {
    error: {
      input: {
        fixedClasses: {
          addonBeforeInputClasses: '',
        },
      },
    },
  },
}

export const phoneInputClassesKeys = Object.keys(phoneInputConfig.classes)

export declare type PhoneInputClassesValidKeys = keyof typeof phoneInputConfig.classes

export declare type PhoneInputProps = WithVariantPropsAndClassesList<{
  modelValue?: string | null
  countryCode?: CountryCode
  phonePlaceholder?: string | undefined
  countryPlaceholder?: string | undefined
  favoriteCountries?: string | undefined
  placeholder?: string
  searchBoxPlaceholder?: string
  noResultsText?: string
  searchingText?: string
  loadingClosedPlaceholder?: string
  loadingMoreResultsText?: string
  minimumInputLengthText?: string
} & InputHTMLAttributes & Data, PhoneInputClassesValidKeys>

