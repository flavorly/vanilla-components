import type { InputHTMLAttributes } from 'vue'
import type { CountryCode } from 'libphonenumber-js/types'
import type { VanillaPhoneNumberClassesValidKeys } from './Config'
import type { Data, WithVariantPropsAndClassesList } from '../../core/types'
import type { VanillaSelectCountryValue } from '../SelectCountry'

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
