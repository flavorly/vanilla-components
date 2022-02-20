import { Data, WithVariantPropsAndClassesList } from '@/core/types';
import { InputHTMLAttributes } from 'vue';
import { VanillaSelectCountryClassesValidKeys } from './Config';


export type VanillaSelectCountryValue = string | undefined | null;

export type VanillaFavoriteCountriesValue =  undefined | string | string[] | Array<string>;

export type VanillaRichSelectTagWithImageProps = WithVariantPropsAndClassesList<{
  modelValue?: VanillaSelectCountryValue,
  favoriteCountries?: string | undefined,
} & InputHTMLAttributes & Data, VanillaSelectCountryClassesValidKeys>;
