import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaPhoneNumberClassesValidKeys } from './Config';
import { VanillaSelectCountryValue } from '@/components/SelectCountry';
import { CountryCode } from 'libphonenumber-js/types';

export type VanillaPhoneNumberProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  countryCode?: CountryCode,
  nationalNumber?: string | number | undefined,
  phonePlaceholder?: string | undefined
  countryPlaceholder?: string | undefined,
  favoriteCountries?: string | undefined,
} & InputHTMLAttributes & Data, VanillaPhoneNumberClassesValidKeys>;
