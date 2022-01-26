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
        :errors="errors"
        :model-value="modelValue"
        :name="'countryCode'+name"
        :options="countryOptions"
        :search="searchPhoneCountries"
        :show-errors="false"
        layout="naked"
        @update:model-value="$emit('update:modelValue',$event)"
      />
    </div>
    <vanilla-form-errors
      v-if="hasErrors && showErrors"
      :error="errors"
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
    },
    mixins: [
        UseFormInputs,
        SyncProps
    ],
    props: {
        modelValue: {
            type: [Object, Array, String, Number],
            required: false,
            default: '',
        },
    },
    emits: [
        'update:modelValue',
    ],
    data() {
        return {
            internalCountryCode: null,
        }
    },
    computed: {
        selectedPhoneCountry() {
            return find(
                countries,
                country => country.id === this.internalCountryCode
            ) || first(this.countryOptions)
        },
        countryOptions() {
            return filterCountriesByName('', this.internalCountryCode, countries);
        },
    },
    methods: {
        searchPhoneCountries(options, query) {
            return filterCountriesByName(query, this.internalCountryCode, countries)
        },
    },
}
</script>

