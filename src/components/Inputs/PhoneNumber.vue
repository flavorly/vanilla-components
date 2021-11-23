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
      <div class="mt-1 rounded-md -space-y-px">
        <!-- Actual Country Code-->
        <vanilla-input-rich-select
          :errors="errors"
          :model-value="countryCode"
          :name="'phoneCountryCode'+name"
          :options="phoneCountriesOptions"
          :search="searchPhoneCountries"
          :show-errors="false"
          grouped="bellow"
          layout="naked"
          @update:modelValue="$emit('update:countryCode',$event)"
        >
          <template #pre-span="{ anOption }">
            <span>
              <vanilla-flag-icon
                :iso="anOption.value"
                class="h-3"
              />
            </span>
          </template>
        </vanilla-input-rich-select>
        <!-- National Phone Number-->
        <div class="relative group">
          <vanilla-input-text
            :errors="errors"
            :model-value="phone"
            :name="'phoneNumber'+name"
            :placeholder="phonePlaceHolder"
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
          </vanilla-input-text>
        </div>
      </div>
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
import SyncProps from "@/utils/SyncProps";
import UseFormInputs from "@/utils/UseFormInputs";
import VanillaInputLayout from "@/components/Inputs/Partials/Layout";
import VanillaFormErrors from "@/components/Inputs/Partials/Errors";
import VanillaFormHelper from "@/components/Inputs/Partials/Helper";
import VanillaFormLabel from "@/components/Inputs/Partials/Label";
import VanillaInputRichSelect from "@/components/Inputs/RichSelect";
import VanillaInputText from "@/components/Inputs/Text";
import VanillaFlagIcon from "@/components/Icons/FlagIcon/Index";
import {filterCountriesByName, phoneCountries} from "@/utils/CountryCodes";
import find from 'lodash/find';
import first from 'lodash/first';

export default {
  name: 'VanillaInputPhoneNumber',
  components: {
    VanillaFlagIcon,
    VanillaFormLabel,
    VanillaFormHelper,
    VanillaFormErrors,
    VanillaInputText,
    VanillaInputRichSelect,
    VanillaInputLayout,
  },
  mixins: [
    UseFormInputs,
    SyncProps
  ],
  props: {
    phone: {
      type: [String, Number],
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
    fullPhone: {
      type: [String, Number],
      required: false,
      default: null,
      sync: 'internalFullPhone'
    },
    phonePlaceHolder: {
      type: [String, Number],
      required: false,
      default: (props) => {
        return '4844578762';
      },
    }
  },
  emits: [
    'update:phone',
    'update:countryCode',
    'update:countryDialCode',
    'update:fullPhone',
  ],
  data() {
    return {
      internalPhoneNumber: null,
      internalCountryCode: null,
      internalCountryDialCode: this.selectedPhoneCountry?.dialCode,
      internalFullPhone: null,
    }
  },
  computed: {
    selectedPhoneCountry() {
      return find(
        phoneCountries,
        country => country.value === this.internalCountryCode
      ) || first(this.phoneCountriesOptions)
    },
    phoneCountriesOptions() {
      return filterCountriesByName('', this.internalCountryCode, phoneCountries);
    },
  },
  watch: {
    internalPhoneNumber: {
      immediate: false,
      handler: function (value, oldValue) {
        // This ensures the state is cleared when the user changes the input
        if (value !== '') {
          this.internalFullPhone = '+' + this.internalCountryDialCode + value;
          this.$emit('update:fullPhone', this.internalFullPhone)
        }
      }
    },
    internalCountryCode: {
      immediate: false,
      handler: function (value, oldValue) {
        // This ensures the state is cleared when the user changes the input
        if (value !== '') {
          this.internalCountryDialCode = this.selectedPhoneCountry?.dialCode;
          this.internalFullPhone = '+' + this.internalCountryDialCode + this.internalPhoneNumber;
          this.$emit('update:fullPhone', this.internalFullPhone)
          this.$emit('update:countryDialCode', this.internalCountryDialCode)
        }
      }
    },
  },
  methods: {
    searchPhoneCountries(options, query) {
      return filterCountriesByName(query, this.internalCountryCode, phoneCountries)
    },
  },
}
</script>

