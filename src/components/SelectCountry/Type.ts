import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes, PropType } from 'vue';
import { VanillaSelectCountryClassesValidKeys } from './Config';


export declare type VanillaSelectCountryValue = string | undefined | null;

export declare type VanillaFavoriteCountriesValue =  undefined | string | string[] | Array<string>;

export declare type VanillaSelectCountryProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  favoriteCountries?: string | undefined,
  labelWithDialCode: {
    type: boolean,
    required: boolean,
    default: boolean,
  },
  labelWithCountryCode: boolean
} & InputHTMLAttributes & Data, VanillaSelectCountryClassesValidKeys>;
