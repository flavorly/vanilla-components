import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaSelectCountryClassesValidKeys } from './Config';


export declare type VanillaSelectCountryValue = string | undefined | null;

export declare type VanillaFavoriteCountriesValue =  undefined | string | string[] | Array<string>;

export declare type VanillaSelectCountryProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  favoriteCountries?: string | undefined,
  labelWithDialCode?: boolean,
  labelWithCountryCode: boolean,
  placeholder?: string,
  searchBoxPlaceholder?: string,
  noResultsText?: string,
  searchingText?: string,
  loadingClosedPlaceholder?: string,
  loadingMoreResultsText?: string,
  minimumInputLengthText?: string,
} & InputHTMLAttributes & Data, VanillaSelectCountryClassesValidKeys>;
