<template>
  <div class="vanilla-input">
    <vanilla-rich-select
      v-model="localValue"
      :options="preFetchOptions"
      :fetch-options="fetchCountries"
      :minimum-input-length="2"
      :value-attribute="'value'"
      :text-attribute="'label'"
      :clear-search-on-close="true"
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
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useBootVariant, useVModel, useVariantProps } from '@/core/use';
import { hasSlot } from '@/core/helpers';
import { VanillaInputValue, VanillaInputProps } from '@/components/Input/Type';
import VanillaRichSelect from '@/components/RichSelect/RichSelect.vue';
import VanillaSelectCountryOption from './SelectCountryOption.vue';
import { filterCountriesByName, countries } from '@/utils/CountryCodes';

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
        ...useVariantProps<VanillaInputProps>(),
        modelValue: {
            type: [String, Number] as PropType<VanillaInputValue>,
            default: undefined,
        },
        favoriteCountries: {
            type: [Array, Object] as PropType<string[]>,
            required: false,
            default: () => ['US', 'GB', 'PT', 'FR', 'DE'],
        },
    },
    setup(props) {
        const localValue = useVModel(props, 'modelValue');
        const {
            errors,
            localVariant,
        } = useBootVariant(props, 'errors', localValue);

        const preFetchOptions = filterCountriesByName(
            '',
            localValue.value?.toString(),
            countries,
            2,
            props.favoriteCountries,
        );

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

        return {
            localValue,
            localVariant,
            errors,
            hasSlot,
            fetchCountries,
            preFetchOptions,
        };
    },
});
</script>

