import type { InputHTMLAttributes } from 'vue'
import { commonClasses } from '@/core/config'
import { richSelectConfig } from '@/components/rich-select/config'
import type {
  Data,
  FavoriteCountriesValue,
  MinimumInputLengthTextProp,
  WithVariantPropsAndClassesList,
} from '@/core/types'

export const countryInputConfig = richSelectConfig

export const countryInputOptionConfig = {
  classes: {
    wrapper: 'relative',

    labelAndImageWrapper: 'relative',
    labelAndImageContainer: 'flex items-center space-x-2 text-sm block',
    labelAndImageContainerSelected: 'font-semibold',
    labelAndImageContainerRegular: 'font-normal',

    image: 'flex-shrink-0 w-6 h-6',
    label: 'block whitespace-nowrap truncate',
    selectedIconContainer: 'absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-primary-600',
    fallbackImage: 'flex-shrink-0 w-[24px] h-[16px] bg-gray-300 animate-pulse rounded-sm',
    icon: commonClasses.iconsSize,
  },
}

export const countryInputClassesKeys = Object.keys(countryInputConfig.classes)
export const countryInputOptionClassesKeys = Object.keys(countryInputOptionConfig.classes)

export declare type CountryInputClassesValidKeys = keyof typeof countryInputConfig.classes
export declare type CountryInputOptionClassesValidKeys = keyof typeof countryInputOptionConfig.classes

export declare type CountryValue = string | undefined | null

export declare type CountryInputProps = WithVariantPropsAndClassesList<{
  modelValue?: CountryValue
  favoriteCountries?: FavoriteCountriesValue
  labelWithDialCode?: boolean
  labelWithCountryCode?: boolean
  placeholder?: string
  searchBoxPlaceholder?: string
  noResultsText?: string
  searchingText?: string
  loadingClosedPlaceholder?: string
  loadingMoreResultsText?: string
  minimumInputLengthText?: MinimumInputLengthTextProp
} & InputHTMLAttributes & Data, CountryInputOptionClassesValidKeys>

export declare type CountryInputOptionProps = WithVariantPropsAndClassesList<{
  country?: object
  selected?: boolean
  description?: string | undefined
  hasErrors?: boolean
  parentClasses?: string[] | string
  labelWithDialCode?: boolean
  labelWithCountryCode?: boolean
} & InputHTMLAttributes & Data, CountryInputOptionClassesValidKeys>

