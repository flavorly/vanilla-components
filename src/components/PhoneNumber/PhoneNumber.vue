<template>
  <div
    class="vanilla-input-phone-number rounded-md"
  >
    <vanilla-select-country
      model-value="PT"
      :has-item-bellow="true"
    />
    <vanilla-input
      v-model="phoneNumber"
      class="rounded-t-none"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/core';
import { VanillaPhoneNumberProps, VanillaPhoneNumberConfig, VanillaPhoneNumberClassesKeys } from './index';
import { VanillaFavoriteCountriesValue } from '@/components/SelectCountry';
import VanillaInput from '@/components/Input/Input.vue';
import VanillaSelectCountry from '@/components/SelectCountry/SelectCountry.vue';

export default defineComponent({
    name: 'VanillaPhoneNumber',
    components: {
        VanillaInput,
        VanillaSelectCountry,
    },
    inheritAttrs: false,
    compatConfig: {
        MODE: 3,
    },
    props: {
        ...useVariantProps<VanillaPhoneNumberProps>(),
        modelValue: {
            type: [String, Number] as PropType<string>,
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

        const { configuration } = useConfigurationWithClassesList<VanillaPhoneNumberProps>(
            VanillaPhoneNumberConfig,
            VanillaPhoneNumberClassesKeys,
            localVariant,
        );

        const phoneCountry = ref(null);
        const phoneNumber = ref(null);

        return {
            phoneCountry,
            phoneNumber,
        };
    },
});
</script>

