<template>
  <vanilla-rich-select
    v-model="localValue"
    v-bind="bindAttributes"
    :options="preFetchOptions"
    :fetch-options="fetchCountries"
    :minimum-input-length="2"
    :value-attribute="'value'"
    :text-attribute="'label'"
    :clear-search-on-close="true"
    :variant="localVariant"
    :show-errors="showErrors"
    :search-box-placeholder="searchBoxPlaceholder"
    :no-results-text="noResultsText"
    :searching-text="searchingText"
    :loading-closed-placeholder="loadingClosedPlaceholder"
    :loading-more-results-text="loadingMoreResultsText"
    :minimum-input-length-text="minimumInputLengthText"
    :clearable="false"
    :select-on-close="false"
  >
    <template #label="{ option: selectedCountry, className, isSelected, hasErrors }">
      <VanillaSelectCountryOption
        :country="selectedCountry"
        :selected="isSelected"
        :parent-classes="className"
        :has-errors="hasErrors"
        :label-with-dial-code="props.labelWithDialCode"
        :label-with-country-code="props.labelWithCountryCode"
      />
    </template>
    <template #option="{ option: { raw: country }, className, isSelected, hasErrors}">
      <VanillaSelectCountryOption
        :country="country"
        :selected="isSelected"
        :parent-classes="className"
        :has-errors="hasErrors"
        :label-with-dial-code="props.labelWithDialCode"
        :label-with-country-code="props.labelWithCountryCode"
      />
    </template>
  </vanilla-rich-select>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue';
import { useBootVariant, useVModel, useVariantProps, hasSlot, useAttributesAndProps } from '@/core';
import { filterCountriesByName, countries } from '@/utils/CountryCodes';
import { VanillaSelectCountryProps, VanillaFavoriteCountriesValue, VanillaSelectCountryValue } from './index';
import VanillaRichSelect from '@/components/RichSelect/RichSelect.vue';
import VanillaSelectCountryOption from '@/components/SelectCountry/SelectCountryOption/SelectCountryOption.vue';
import find from 'lodash/find';
import first from 'lodash/first';
import { MinimumInputLengthTextProp } from '@/components/RichSelect';

export default defineComponent({
    name: 'VanillaSelectCountry',
    components: {
        VanillaSelectCountryOption,
        VanillaRichSelect,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaSelectCountryProps>(),
        modelValue: {
            type: [String, Number] as PropType<VanillaSelectCountryValue>,
            default: undefined,
        },
        favoriteCountries: {
            type: [Array, Object, undefined] as PropType<VanillaFavoriteCountriesValue>,
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
    },
    emits: [
        'update:countryDialCode',
        'update:countryCode',
        'update:countryName',
        'update:modelValue',
    ],
    setup(props, { emit }) {

        const localValue = useVModel(props, 'modelValue');
        const { hasErrors, localErrors, localVariant } = useBootVariant(props, 'errors', localValue);

        // Pre-fetch the following Options
        const preFetchOptions = filterCountriesByName(
            '',
            localValue.value?.toString(),
            countries,
            2,
            props.favoriteCountries,
        );

        // Function to fetch Countries from local object
        const fetchCountries = (query?: string) =>
            new Promise((resolve) => {
                resolve(filterCountriesByName(
                    query,
                    localValue.value?.toString(),
                    countries,
                    2,
                    props.favoriteCountries,
                ));
            }).then((response) => ({
                results: response as Record<string, never>[],
                hasMorePages: false,
            }));

        // Actual Country Selected ( Whole object )
        const selectedCountry = computed(() => {
            return find(
                countries,
                country => country.value === localValue.value,
            ) || first(preFetchOptions);
        });

        // Watch & Emit additional data
        watch(localValue, () => {
            emit('update:countryDialCode', selectedCountry.value.dialCode);
            emit('update:countryCode', selectedCountry.value.value);
            emit('update:countryName', selectedCountry.value.name_raw);
        }, { immediate: true });

        // Rebind Attributes
        const bindAttributes = useAttributesAndProps();

        return {
            localValue,
            localErrors,
            localVariant,
            hasErrors,
            hasSlot,
            fetchCountries,
            preFetchOptions,
            props,
            bindAttributes,
            selectedCountry,
        };
    },
});
</script>

