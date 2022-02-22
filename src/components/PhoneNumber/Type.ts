import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaPhoneNumberClassesValidKeys } from './Config';
import { VanillaSelectCountryValue } from '@/components/SelectCountry';
import { CountryCode } from 'libphonenumber-js/types';

export type VanillaPhoneNumberProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  favoriteCountries?: string | undefined,
  countryCode?: CountryCode,
  nationalNumber?: string | number | undefined
} & InputHTMLAttributes & Data, VanillaPhoneNumberClassesValidKeys>;
