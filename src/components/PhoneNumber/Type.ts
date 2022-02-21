import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaPhoneNumberClassesValidKeys } from './Config';
import { VanillaSelectCountryValue } from '@/components/SelectCountry';

export type VanillaPhoneNumberProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  favoriteCountries?: string | undefined,
} & InputHTMLAttributes & Data, VanillaPhoneNumberClassesValidKeys>;
