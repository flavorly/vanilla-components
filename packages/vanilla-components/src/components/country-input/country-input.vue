<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent, watch } from 'vue'
import find from 'lodash/find'
import first from 'lodash/first'
import type { CountryInputClassesValidKeys, CountryInputProps, CountryValue } from './config'
import { countryInputConfig } from './config'
import CountryOption from '@/components/country-input/country-input-option.vue'
import RichSelect from '@/components/rich-select/rich-select.vue'
import { countries, filterCountriesByName } from '@/core/utils'
import type { FavoriteCountriesValue, MinimumInputLengthTextProp } from '@/core/types'
import { useAttributesAndProps, useConfiguration, useVModel, useVariantProps } from '@/core/use'

const props = defineProps({
  ...useVariantProps<CountryInputProps, CountryInputClassesValidKeys>(),
  modelValue: {
    type: [String, Number] as PropType<CountryValue>,
    default: undefined,
  },
  favoriteCountries: {
    type: [Array, Object, undefined] as PropType<FavoriteCountriesValue>,
    required: false,
    default: () => ['US', 'GB', 'PT', 'FR', 'DE'],
  },
  labelWithDialCode: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  labelWithCountryCode: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
  searchBoxPlaceholder: {
    type: String,
    default: 'Search for your country here...',
  },
  noResultsText: {
    type: String,
    default: '😟 Sorry but we did not find any countries to your query. Try another one query?',
  },
  searchingText: {
    type: String,
    default: 'Please wait, searching for countries...',
  },
  loadingClosedPlaceholder: {
    type: String,
    default: 'Loading, please wait ...',
  },
  loadingMoreResultsText: {
    type: String,
    default: 'Loading more options...',
  },
  minimumInputLengthText: {
    type: [Function, String] as PropType<MinimumInputLengthTextProp>,
    default: () => (minimumInputLength: number): string => `Search more countries by entering ${minimumInputLength} or more characters`,
  },
})

const emit = defineEmits([
  'update:countryDialCode',
  'update:countryCode',
  'update:countryName',
  'update:modelValue',
])

defineComponent({ inheritAttrs: false })

const localValue = useVModel(props, 'modelValue')

// Pre-fetch the following Options
const preFetchOptions = filterCountriesByName(
  '',
  localValue.value?.toString(),
  countries,
  2,
  props.favoriteCountries,
)

// Function to fetch Countries from local object
const fetchCountries = (query?: string) =>
  new Promise((resolve) => {
    resolve(filterCountriesByName(
      query,
      localValue.value?.toString(),
      countries,
      2,
      props.favoriteCountries,
    ))
  }).then(response => ({
    results: response as Record<string, never>[],
    hasMorePages: false,
  }))

// Actual Country Selected ( Whole object )
const selectedCountry = computed(() => {
  return find(
    countries,
    country => country.value === localValue.value,
  ) || first(preFetchOptions)
})

// Watch & Emit additional data
watch(localValue, () => {
  emit('update:countryDialCode', selectedCountry.value.dialCode)
  emit('update:countryCode', selectedCountry.value.value)
  emit('update:countryName', selectedCountry.value.name_raw)
}, { immediate: true })

const { configuration, errors, hasErrors, variant } = useConfiguration<CountryInputProps>(countryInputConfig, 'CountryInput', localValue)

// Rebind Attributes
const bindAttributes = useAttributesAndProps()
</script>

<template>
  <RichSelect
    v-model="localValue"
    v-bind="bindAttributes"
    :options="preFetchOptions"
    :fetch-options="fetchCountries"
    :minimum-input-length="2"
    value-attribute="value"
    text-attribute="label"
    :clear-search-on-close="true"
    :variant="variant"
    :show-errors="props.showErrors"
    :search-box-placeholder="searchBoxPlaceholder"
    :no-results-text="noResultsText"
    :searching-text="searchingText"
    :loading-closed-placeholder="loadingClosedPlaceholder"
    :loading-more-results-text="loadingMoreResultsText"
    :minimum-input-length-text="minimumInputLengthText"
    :rounded="props.rounded"
    :clearable="false"
    :select-on-close="false"
  >
    <template #label="{ option, className, isSelected, hasErrors }">
      <CountryOption
        :country="selectedCountry"
        :selected="isSelected"
        :parent-classes="className"
        :has-errors="hasErrors"
        :label-with-dial-code="props.labelWithDialCode"
        :label-with-country-code="props.labelWithCountryCode"
      />
    </template>
    <template #option="{ option: { raw: country }, className, isSelected, hasErrors }">
      <CountryOption
        :country="country"
        :selected="isSelected"
        :parent-classes="className"
        :has-errors="hasErrors"
        :label-with-dial-code="props.labelWithDialCode"
        :label-with-country-code="props.labelWithCountryCode"
      />
    </template>
  </RichSelect>
</template>

