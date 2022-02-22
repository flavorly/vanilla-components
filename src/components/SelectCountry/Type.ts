import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes, PropType } from 'vue';
import { VanillaSelectCountryClassesValidKeys } from './Config';


export type VanillaSelectCountryValue = string | undefined | null;

export type VanillaFavoriteCountriesValue =  undefined | string | string[] | Array<string>;

export type VanillaSelectCountryProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  favoriteCountries?: string | undefined,
  labelWithDialCode: {
    type: boolean,
    required: boolean,
    default: boolean,
  },
  labelWithCountryCode: boolean
} & InputHTMLAttributes & Data, VanillaSelectCountryClassesValidKeys>;
