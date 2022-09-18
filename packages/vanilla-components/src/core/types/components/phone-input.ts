import type { InputHTMLAttributes } from 'vue'
import type { CountryCode } from 'libphonenumber-js/types'
import type { Data, WithVariantPropsAndClassesList } from '../index'
import type { VanillaSelectCountryValue } from '../SelectCountry'
import type { VanillaPhoneNumberClassesValidKeys } from './config'

export declare type VanillaPhoneNumberProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue
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
} & InputHTMLAttributes & Data, VanillaPhoneNumberClassesValidKeys>
