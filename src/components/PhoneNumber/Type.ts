import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaPhoneNumberClassesValidKeys } from './Config';
import { VanillaSelectCountryValue } from '@/components/SelectCountry';
import { CountryCode } from 'libphonenumber-js/types';

export declare type VanillaPhoneNumberProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  countryCode?: CountryCode,
  phonePlaceholder?: string | undefined
  countryPlaceholder?: string | undefined,
  favoriteCountries?: string | undefined,
  placeholder?: string,
  searchBoxPlaceholder?: string,
  noResultsText?: string,
  searchingText?: string,
  loadingClosedPlaceholder?: string,
  loadingMoreResultsText?: string,
  minimumInputLengthText?: string,
} & InputHTMLAttributes & Data, VanillaPhoneNumberClassesValidKeys>;
