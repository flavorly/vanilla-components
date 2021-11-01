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
      <div class="mt-1 rounded-md -space-y-px">
        <!-- Actual Country Code-->
        <x-input-rich-select
          :errors="errors"
          :model-value="countryCode"
          :name="'phoneCountryCode'+name"
          :options="phoneCountriesOptions"
          :search="searchPhoneCountries"
          :show-errors="false"
          grouped="bellow"
          layout="naked"
          @update:modelValue="$emit('update:countryCode',$event)"
        />
        <!-- National Phone Number-->
        <div class="relative group">
          <x-input-text
            :errors="errors"
            :model-value="phone"
            :name="'phoneNumber'+name"
            :placeholder="$t('placeholders.phone_number')"
            :show-errors="false"
            class="pl-14"
            grouped="above"
            layout="naked"
            type="tel"
            @update:modelValue="$emit('update:phone',$event)"
          >
            <template #before>
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20">
                <span class="text-gray-500 sm:text-sm">+{{ selectedPhoneCountry?.dialCode }}</span>
              </div>
            </template>
          </x-input-text>
        </div>
      </div>
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
import SyncProps from "@/utils/SyncProps";
import UseFormInputs from "@/utils/UseFormInputs";
import XInputLayout from "@/components/Inputs/Partials/Layout";
import XFormErrors from "@/components/Inputs/Partials/Errors";
import XFormHelper from "@/components/Inputs/Partials/Helper";
import XFormLabel from "@/components/Inputs/Partials/Label";
import {filterCountriesByName, phoneCountries} from "@/utils/CountryCodes";
import XInputRichSelect from "@/components/Inputs/RichSelect";
import XInputText from "@/components/Inputs/Text";
import find from 'lodash/find';
import first from 'lodash/first';

export default {
    name: 'XInputPhoneNumber',
    components: {
        XFormLabel,
        XFormHelper,
        XFormErrors,
        XInputText,
        XInputRichSelect,
        XInputLayout,
    },
    mixins: [
        UseFormInputs,
        SyncProps
    ],
    props: {
        phone: {
            type: [Object, Array, String, Number],
            required: false,
            default: '',
            sync: 'internalPhoneNumber',
        },
        countryCode: {
            type: [String, Number],
            required: false,
            default: '',
            sync: 'internalCountryCode'
        },
    },
    emits: [
        'update:phone',
        'update:countryCode'
    ],
    data() {
        return {
            internalPhoneNumber: null,
            internalCountryCode: null,
        }
    },
    computed: {
        selectedPhoneCountry() {
            return find(
                phoneCountries,
                country => country.id === this.internalCountryCode
            ) || first(this.phoneCountriesOptions)
        },
        phoneCountriesOptions() {
            return filterCountriesByName('', this.internalCountryCode, phoneCountries);
        },
    },
    methods: {
        searchPhoneCountries(options, query) {
            return filterCountriesByName(query, this.internalCountryCode, phoneCountries)
        },
    },
}
</script>

