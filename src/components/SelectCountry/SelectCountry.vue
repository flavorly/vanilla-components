<template>
  <vanilla-rich-select
    v-model="localValue"
    v-bind="{...$attrs}"
    :variant="localVariant"
    :options="preFetchOptions"
    :fetch-options="fetchCountries"
    :minimum-input-length="2"
    :value-attribute="'value'"
    :text-attribute="'label'"
    :clear-search-on-close="true"
    :has-item-bellow="props.hasItemBellow"
    :has-item-above="props.hasItemAbove"
  >
    <template #label="{ option: { raw: country }, className, isSelected, hasErrors }">
      <VanillaSelectCountryOption
        :name="country?.label"
        :country="country?.value"
        :selected="isSelected"
        :parent-classes="className"
        :has-errors="hasErrors"
      />
    </template>
    <template #option="{ option: { raw: country }, className, isSelected, hasErrors}">
      <VanillaSelectCountryOption
        class="px-3 py-2"
        :name="country?.label"
        :country="country?.value"
        :selected="isSelected"
        :parent-classes="className"
        :has-errors="hasErrors"
      />
    </template>
  </vanilla-rich-select>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, watch } from 'vue';
import { useBootVariant, useVModel, useVariantProps, hasSlot } from '@/core';
import { filterCountriesByName, countries } from '@/utils/CountryCodes';
import { VanillaRichSelectTagWithImageProps, VanillaFavoriteCountriesValue, VanillaSelectCountryValue } from './index';
import VanillaRichSelect from '@/components/RichSelect/RichSelect.vue';
import VanillaSelectCountryOption from '@/components/SelectCountry/SelectCountryOption/SelectCountryOption.vue';
import find from 'lodash/find';
import first from 'lodash/first';

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
        ...useVariantProps<VanillaRichSelectTagWithImageProps>(),
        modelValue: {
            type: [String, Number] as PropType<VanillaSelectCountryValue>,
            default: undefined,
        },
        favoriteCountries: {
            type: [Array, Object, undefined] as PropType<VanillaFavoriteCountriesValue>,
            required: false,
            default: () => ['US', 'GB', 'PT', 'FR', 'DE'],
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
        const {
            errors,
            localVariant,
        } = useBootVariant(props, 'errors', localValue);

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

        return {
            localValue,
            localVariant,
            errors,
            hasSlot,
            fetchCountries,
            preFetchOptions,
            props,
        };
    },
});
</script>

