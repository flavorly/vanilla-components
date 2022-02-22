<template>
  <div
    class="vanilla-input-phone-number"
    :class="configuration.classesList.wrapper"
  >
    <vanilla-select-country
      v-model="phoneCountryCode"
      :variant="localVariant"
      :has-item-bellow="true"
      :label-with-dial-code="true"
      :class="[
        configuration.classesList.select,
      ]"
    />
    <vanilla-input
      v-model="phoneNumber"
      :variant="localVariant"
      :class="[
        configuration.classesList.input,
      ]"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, watch } from 'vue';
import { useBootVariant, useVModel, useVariantProps, useConfigurationWithClassesList } from '@/core';
import { VanillaPhoneNumberProps, VanillaPhoneNumberConfig, VanillaPhoneNumberClassesKeys } from './index';
import { VanillaFavoriteCountriesValue } from '@/components/SelectCountry';
import VanillaInput from '@/components/Input/Input.vue';
import VanillaSelectCountry from '@/components/SelectCountry/SelectCountry.vue';
import parsePhoneNumber from 'libphonenumber-js';
import { CountryCode, PhoneNumber, CountryCallingCode } from 'libphonenumber-js/types';

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
        countryCode: {
            type: [String] as PropType<CountryCode>,
            default: '',
        },
        nationalNumber: {
            type: [String, Number] as PropType<string | number>,
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
        'update:phoneNumberNational',
        'update:phoneNumberInternational',
    ],
    setup(props, { emit }) {
        const localValue = useVModel(props, 'modelValue');
        const {
            errors,
            hasErrors,
            localVariant,
        } = useBootVariant(props, 'errors', localValue);

        const { configuration } = useConfigurationWithClassesList<VanillaPhoneNumberProps>(
            VanillaPhoneNumberConfig,
            VanillaPhoneNumberClassesKeys,
            localVariant,
        );

        const phoneCountryCode: CountryCode | Ref = ref(props.countryCode);
        const phoneDialCode: CountryCallingCode | Ref = ref(null);
        const phoneNumber: Ref | string = ref(props.nationalNumber || localValue.value);
        const isValidPhoneNumber: Ref<boolean> = ref(false);
        const parsedPhoneNumber: Ref<PhoneNumber> | Ref = ref(null);

        // Watch Country Code
        watch([phoneCountryCode, phoneNumber], ([newPhoneCountry, newPhoneNumber]) => {

            parsedPhoneNumber.value = parsePhoneNumber(
                newPhoneNumber,
                {
                    defaultCountry: newPhoneCountry,
                    defaultCallingCode: newPhoneCountry,
                    extract: true,
                },
            );

            if (parsedPhoneNumber.value) {
                isValidPhoneNumber.value = parsedPhoneNumber.value?.isValid();
                phoneCountryCode.value = parsedPhoneNumber.value.country;
                phoneDialCode.value = parsedPhoneNumber.value.countryCallingCode;
                phoneNumber.value = parsedPhoneNumber.value.nationalNumber;
            }

            // Watch & Emit additional data
            emit('update:countryDialCode', phoneDialCode.value);
            emit('update:countryCode', phoneCountryCode.value);
            emit('update:phoneNumberNational', phoneNumber.value);
            emit('update:phoneNumberInternational', localValue.value);

            localValue.value = '+' + phoneDialCode.value + phoneNumber.value;

        }, { immediate: false });

        watch(localVariant, (variant) => console.log('variant changed', variant));

        return {
            configuration,
            errors,
            hasErrors,
            localVariant,
            phoneCountryCode,
            phoneNumber,
            isValidPhoneNumber,
        };
    },
});
</script>

