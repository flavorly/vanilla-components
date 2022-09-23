import type { CountryCode } from 'libphonenumber-js/types'
import type { InputHTMLAttributes } from 'vue'
import type { Data, WithVariantPropsAndClassesList } from '@/core/types'

export const phoneInputConfig = {
  classes: {
    wrapper: 'relative',
    input: 'rounded-t-none focus:z-20 pl-14',
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

