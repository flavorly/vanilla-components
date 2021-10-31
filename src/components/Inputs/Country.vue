<template>
  <x-input-layout :layout="layout">
    <template #label>
      <slot
        v-if="$slots.label || label"
        name="label"
      >
        <x-form-label
          :label-for="name"
          :value="label"
        />
      </slot>
    </template>

    <div class="relative flex-1">
      <x-rich-select
        :errors="errors"
        :model-value="modelValue"
        :name="'countryCode'+name"
        :options="countryOptions"
        :search="searchPhoneCountries"
        :show-errors="false"
        layout="naked"
        @update:modelValue="$emit('update:modelValue',$event)"
      />
    </div>
    <x-form-errors
      v-if="hasErrors && showErrors"
      :error="errors"
    />
    <x-form-helper
      v-if="help"
      :text="help"
    />
  </x-input-layout>
</template>
<script>
import UseFormInputs from "@/utils/UseFormInputs";
import SyncProps from "@/utils/SyncProps";
import {filterCountriesByName, countries} from "@/utils/CountryCodes";
import XInputLayout from "./Partials/Layout";
import XFormErrors from "./Partials/Errors";
import XFormHelper from "./Partials/Helper";
import XFormLabel from "./Partials/Label";
import XRichSelect from "./RichSelect";
import find from 'lodash/find';
import first from 'lodash/first';

export default {
    name: 'XInputCountry',
    components: {
        XFormLabel,
        XFormHelper,
        XFormErrors,
        XRichSelect,
        XInputLayout,
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

