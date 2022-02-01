<template>
  <vanilla-input-layout :layout="layout">
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <vanilla-form-label
          :label-for="name"
          :value="label"
        />
      </slot>
    </template>

    <div class="relative flex-1">
      <vanilla-input-rich-select
        v-model="internalCountryCode"
        :errors="internalErrors"
        :model-value="modelValue"
        :name="'countryCode'+name"
        :options="countryOptions"
        :search="searchCountries"
        :show-errors="false"
        layout="naked"
      >
        <!-- Selected Option -->
        <template #selected="{ option }">
          <slot name="selected">
            <vanilla-flag-icon
              :country="option?.value.toLowerCase()"
              class="h-3"
            />
            <span
              class="block whitespace-nowrap"
              v-html="option?.label"
            />
          </slot>
        </template>

        <!-- Option Template -->
        <template #option="{ anOption }">
          <slot name="option">
            <vanilla-flag-icon
              :country="anOption?.value.toLowerCase()"
              class="h-3"
            />
            <span
              class="block whitespace-nowrap"
              v-html="anOption?.label"
            />
          </slot>
        </template>
      </vanilla-input-rich-select>
    </div>
    <vanilla-form-errors
      v-if="hasErrors && showErrors"
      :error="internalErrors"
    />
    <vanilla-form-helper
      v-if="help"
      :text="help"
    />
  </vanilla-input-layout>
</template>
<script>
import UseFormInputs from "@/utils/UseFormInputs";
import SyncProps from "@/utils/SyncProps";
import {filterCountriesByName, countries} from "@/utils/CountryCodes";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout.vue";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors.vue";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper.vue";
import VanillaFormLabel from "@/components/Inputs/Partials/Label.vue";
import VanillaInputRichSelect from "@/components/Inputs/RichSelect.vue";
import VanillaFlagIcon from "@/components/Icons/FlagIcon/Index.vue";
import find from 'lodash/find';
import first from 'lodash/first';

export default {
    name: 'VanillaInputCountry',
    components: {
        VanillaFormLabel,
        VanillaFormHelper,
        VanillaFormErrors,
        VanillaInputRichSelect,
        VanillaInputLayout,
        VanillaFlagIcon,
    },
    mixins: [
        UseFormInputs,
        SyncProps
    ],
    props: {
        favoriteCountries: {
            type: [Array, Object],
            required: false,
            default: () => ['US', 'GB', 'PT', 'FR', 'DE'],
        },
    },
    emits: [
        'update:countryDialCode',
        'update:countryCode',
        'update:countryName',
    ],
    data() {
        return {
            internalCountryCode: null,
        }
    },
    computed: {
        selectedCountry() {
            return find(
                countries,
                country => country.id === this.internalCountryCode
            ) || first(this.countryOptions)
        },
        countryOptions() {
            return filterCountriesByName('', this.internalCountryCode, countries,2, this.favoriteCountries);
        },
    },
    watch: {
        internalCountryCode: {
            immediate: true,
            handler: function (value, oldValue) {
                // This ensures the state is cleared when the user changes the input
                if (value !== '' && value !== oldValue) {
                    this.$emit('update:countryDialCode', this.selectedCountry.dialCode);
                    this.$emit('update:countryCode', this.selectedCountry.value);
                    this.$emit('update:countryName', this.selectedCountry.name_raw);
                    this.internalValue = this.internalCountryCode;
                }
            }
        },
    },
    methods: {
        searchCountries(options, query) {
            return filterCountriesByName(query, this.internalCountryCode, countries, 2, this.favoriteCountries)
        },
    },
}
</script>

